 
# 📝 Online Quiz Application

An interactive **MERN stack (MongoDB, Express, React, Node.js)** based Online Quiz Platform that allows users to participate in quizzes, track scores, and manage their progress.  

## 🚀 Features
- 🔐 **User Authentication**: Sign up, log in, and secure sessions with JWT.  
- 🧑‍🏫 **Quiz Management**: Admins can create, update, and delete quizzes.  
- 🎯 **Take Quizzes**: Users can attempt quizzes with multiple-choice questions.  
- 🏆 **Leaderboard**: Tracks top scores across users.  
- 📊 **Results Dashboard**: Displays user progress and quiz history.  
- ☁️ **Database**: Powered by MongoDB Atlas for cloud-based storage.  

---

## 🛠️ Tech Stack
- **Frontend**: React, Redux/Context API, Tailwind CSS (or CSS/Bootstrap)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas  
- **Authentication**: JWT + bcrypt  

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ramyegneswar2990/Online-Quiz.git
   cd Online-Quiz

2.Install dependencies

Backend:
   cd backend
   npm install
Frontend:
    cd ../frontend
    npm install
3.Set up environment variables
Create a .env file inside the backend folder with:
Copy
Edit
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key    

4.Run the app

Start backend:
     cd backend
     npm run dev


Start frontend:
     cd frontend
     npm run dev
