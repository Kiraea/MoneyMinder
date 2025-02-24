# MoneyMinder - A full-stack web dashboard application related to financial tracking
React | Typescript | NodeJS | Postgres.

<h1>Features: </h1>
* Consists of interactive charts and graphs for visualization of different metrics. </br>
* OAuth authentication for external providers like Google and GitHub / Db Login. </br>
* Supports Automated entries by different timeframes (day/month/year). </br>
* Custom categorization (Define your own!). </br>


<h1> Demo Images </h1>
<img width="1280" alt="image" src="https://github.com/user-attachments/assets/6bd8b966-5aeb-4e2f-8ccc-1e6fb91bcc90" />
<img width="1280" alt="image" src="https://github.com/user-attachments/assets/70bf1bbe-ad33-4275-8693-644e5baa4faf" />

<img width="1280" alt="image" src="https://github.com/user-attachments/assets/ce7ae046-cace-4ac2-8364-13c1534f2f39" />
<img width="1280" alt="image" src="https://github.com/user-attachments/assets/e2b98b75-530c-4aa0-a5a8-7b6ab877383d" />
<img width="1280" alt="image" src="https://github.com/user-attachments/assets/9ba9a664-23fe-4cd1-9b07-8da7e073290e" />








Requirements:
Setted up Github / Google Oauth
Postgres - created kanban schema

Setup Instructions to run Locally:
1. Clone the application to a folder
2. create env variables for Frontend and Backend (Refer below for required variables)
5. Go to Frontend folder
6. Run command "npm i"
7. Start command npm run dev
8. Go to Backend Folder
9. Run command "npm i"
10. Start command "npm run start:dev"

Env variables Frontend: VITE_BASE_URL_LINK
Env variables Backend: PORT, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT, DB_SSL, DB_SCHEMA, SESSION_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET

<h1> Frontend Dependencies for prod </h1>:
@faker-js/faker ^9.4.0 </br>
@tanstack/react-query ^5.65.1 </br>
axios ^1.7.9 </br>
chart.js ^4.4.7 </br>
react ^18.3.1 </br>
react-chartjs-2 ^5.3.0 </br>
react-dom ^18.3.1 </br>
react-google-button ^0.8.0 </br>
react-icons ^5.4.0 </br>
react-router ^7.1.3 </br>
react-router-dom ^7.1.3 </br>

<h1> Backend Dependencies for prod: </h1>
argon2 ^0.41.1 </br>
connect-pg-simple ^10.0.0 </br>
cors ^2.8.5 </br>
dotenv ^16.4.7 </br>
express ^4.21.2 </br>
express-session ^1.18.1 </br>
node-cron ^3.0.3 </br>
passport ^0.7.0 </br>
passport-github2 ^0.1.12 </br>
passport-google-oauth20 ^2.0.0 </br>
passport-local ^1.0.0 </br>
pg-pool ^3.7.0 </br>

  
