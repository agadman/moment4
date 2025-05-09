# API - Autentisering och säkerhet
Detta repository innehåller ett REST API byggt med Express och MongoDB. Webbtjänsten hanterar registrering och inloggning av användare med hjälp av JSON Web Tokens (JWT) för autentisering. Den är framtagen inom ramen för kursen Backend-baserad webbutveckling vid Mittuniversitetet.

## Länk
En liveversion av API:et finns tillgänglig på följande URL: https://moment4-6chd.onrender.com/api/

## Installation, databas
Klona detta repository. Kör npm install för att installera nödvändiga paket. Installer Cors och bcrypt. Skapa en .env-fil i projektroten med följande innehåll:

PORT=3000
DATABASE="mongodb+srv://<användare>:<lösenord>@<cluster>.mongodb.net/databasnamn"
JWT_SECRET_KEY="hemlig-nyckel"

Starta servern med npm start. Servern körs då på http://localhost:3000

## Användning
API:et innehåller två publika endpoints för autentisering samt en skyddad route:

| Metod | Ändpunkt         | Beskrivning                               |
| ----- | ---------------- | ----------------------------------------- |
| POST  | `/api/register`  | Registrerar en ny användare               |
| POST  | `/api/login`     | Loggar in en användare och returnerar JWT |
| GET   | `/api/protected` | Skyddad route som kräver JWT              |

### Exempel på JSON vid registrering
{
  "username": "namn",
  "email": "test@email.com",
  "password": "password123"
}

### Exempel på JSON vid inloggning
{
  "email": "test@email.com",
  "password": "password123"
}

## Databasmodell
Mongoose används för att hantera databasen. Ett User objekt har följande struktur:
| Fält     | Typ    | Beskrivning        |
| -------- | ------ | ------------------ |
| username | String | Användarnamn       |
| email    | String | Unik e-postadress  |
| password | String | Hashat lösenord    |
| created  | Date   | Skapat datum       |