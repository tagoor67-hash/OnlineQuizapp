 import axios from "axios";

 export const getLeaderboardByCourse = async (courseName) => {
    const encodedCourseName = encodeURIComponent(courseName)
   const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/leaderboard/${encodedCourseName}`);
   return response.data;
 };
