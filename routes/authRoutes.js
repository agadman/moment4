/**
 * Rotes for auth
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Connect to Mongodb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
}
);

// User model
const User = require('../models/User');

// Add a new user
router.post('/register', async (req, res) => {    
    try {
      const { username, email, password } = req.body;
  
      // Validerar input
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Du måste fylla i alla fält!' });
      }
  
      // Kontrollerar om email redan finns
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'E-postadressen är redan registrerad.' });
      }
  
      // Sparar användare
      const user = new User({ username, email, password });
      await user.save();
  
      res.status(201).json({ message: 'Användare skapad!' });
    } catch (error) {
      res.status(500).json({ error: 'Serverfel vid registrering.' });
    }
  });  

// Login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: 'Du måste ange användarnamn och lösenord!' });
        }

        // Check credentials
        //Does user exist?
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Felaktigt användarnamn/lösenord' });
        }
        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Felaktigt användarnamn/lösenord' });
        } else {
            // Create JWT   
            const payload = { username: user.username, email: user.email};
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            const response = {
                message: 'User logged in!',
                token: token,
            };
            res.status(200).json({ response });
        }

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;