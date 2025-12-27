# Online Quiz Application
Online Quiz Application is a full-stack MERN platform engineered to help B.Tech students practice core engineering topics, track their performance, and earn completion certificates. Built with a React/Vite frontend and an Express/MongoDB backend, it combines smooth user experiences for learners with powerful admin controls for course and quiz management. Users can browse curated courses, attempt timed quizzes, review detailed analytics, and download certificates when they meet eligibility criteria. Administrators get dedicated dashboards to manage users, questions, and quiz results, including a consolidated scoreboard of every learner’s attempts. Robust authentication, JWT-based sessions, and server-side validation keep the ecosystem secure. This repo contains everything needed to run the application locally or deploy it to modern hosting providers, along with documentation, API references, and screenshots for a quick tour.
> **Live Repository:** https://github.com/ramyegneswar2990/Online-Quiz-Application

---

## Table of Contents
1. [Key Features](#key-features)
2. [Architecture Overview](#architecture-overview)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Setup & Installation](#setup--installation)
6. [Environment Variables](#environment-variables)
7. [Running the App](#running-the-app)
8. [API Reference](#api-reference)
9. [Screenshots](#screenshots)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)

---

## Key Features
- 🔐 **Role-based authentication** for users and admins with JWT.
- 🧑‍🏫 **Admin console** to manage quizzes, topics, questions, users, and quiz scores.
- 📝 **Dynamic quiz engine** with categorized questions and per-topic scoring.
- 📊 **Analytics dashboard** highlighting user performance, leaderboard, and quiz history.
- 🏅 **Certificate generator** for learners scoring above the eligibility threshold.
- ⚙️ **RESTful API** secured with middleware for CRUD operations.
- 🌐 **CORS-configured backend** ready for multiple frontend origins.

---

## Architecture Overview
```
┌──────────┐      HTTPS       ┌───────────────┐      MongoDB Atlas
│ React UI │  <────────────>  │  Express API  │  <─>  Collections
└──────────┘                   └───────────────┘        (Users, Admins,
    Vite SPA                        Node.js              Results, Courses)
```
- Frontend served via Vite + React with client-side routing.
- Backend Node.js/Express REST API connecting to MongoDB.
- JWT tokens stored client-side for authenticated requests.

---

## Tech Stack
| Layer      | Technologies |
|------------|--------------|
| Frontend   | React, Vite, React Router, Axios |
| Backend    | Node.js, Express.js |
| Database   | MongoDB Atlas with Mongoose ODM |
| Auth       | JWT, bcrypt |
| Deployment | Render / Netlify / Vercel ready (one config at a time) |

---

## Project Structure
```
Online-Quiz-Application/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── server.js
│   ├── package.json
│   └── .env (local)
├── frontned/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   ├── package.json
│   └── .env (local)
└── README.md (this file)
```
> ✅ Only **one** README is maintained in the repository root to avoid duplication.

---

## Setup & Installation
1. **Clone the repo**
   ```bash
   git clone https://github.com/ramyegneswar2990/Online-Quiz-Application.git
   cd Online-Quiz-Application
   ```
2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```
3. **Install frontend dependencies**
   ```bash
   cd ../frontned
   npm install
   ```

---

## Environment Variables
Create `.env` files inside both backend and frontend directories.

### Backend `.env`
```
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret
CORS_WHITELIST=http://localhost:5173,http://localhost:3000
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000
```

---

## Running the App
### Development mode
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontned
npm run dev
```
- Frontend default port: **5173**
- Backend default port: **5000**

---

## API Reference
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/admin/register` | Register admin |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/users` | Fetch all users |
| DELETE | `/api/admin/users/:id` | Remove a user |
| GET | `/api/admin/quiz-scores` | Aggregated user quiz scores |
| GET | `/certificate/:username/:courseName` | Generate course completion certificate |

> See `/backend/src/routes` for the rest of the endpoints.

---

## Screenshots
Screenshots are stored under `docs/screenshots/`. Save the PNG files using the names below so they render automatically:
<img width="1891" height="899" alt="Screenshot 2025-12-20 173540" src="https://github.com/user-attachments/assets/e4bbe056-d2c4-4458-a0c7-fa4c17feff54" />
<img width="1612" height="893" alt="Screenshot 2025-12-20 173601" src="https://github.com/user-attachments/assets/91529616-58fb-4a81-8986-1789acd81f0c" />
<img width="1895" height="880" alt="Screenshot 2025-12-20 173638" src="https://github.com/user-attachments/assets/4034097c-365f-4a1d-b21f-e93ee3e46d01" />
<img width="1813" height="802" alt="Screenshot 2025-12-20 173657" src="https://github.com/user-attachments/assets/598629df-80d7-4ab0-81f4-80cd9dfddb55" />
<img width="1681" height="821" alt="Screenshot 2025-12-20 173730" src="https://github.com/user-attachments/assets/63d4cbed-040e-4d4a-856c-74f960ce3dd4" />



> Tip: simply copy the PNGs provided in the `/docs/screenshots` folder (or drag them into that folder) and keep the same file names.

---

## Troubleshooting
- **CORS errors**: make sure `CORS_WHITELIST` includes your frontend origin.
- **Port already in use**: stop existing Node processes using `netstat -ano` then `taskkill /PID <id> /F`.
- **Certificate not generated**: ensure quiz scores meet eligibility (>= 75%).

---

## Contributing
1. Fork the repo
2. Create a feature branch `git checkout -b feature/amazing-feature`
3. Commit changes `git commit -m "feat: add amazing feature"`
4. Push branch and open a Pull Request

---

Made with ❤️ to simplify quiz management and learning outcomes.
