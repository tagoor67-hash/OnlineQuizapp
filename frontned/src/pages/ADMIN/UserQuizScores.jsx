import React, { useEffect, useState } from 'react';
import "./UserQuizScores.css";
import Sidebar from '../../components/Sidebar';

const UserQuizScores = () => {
  const [userScores, setUserScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserQuizScores = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/quiz-scores');
      const data = await response.json();
      
      if (data.success && data.data && data.data.users) {
        setUserScores(data.data.users);
      } else {
        setError('Failed to load quiz scores');
      }
    } catch (error) {
      console.error('Error fetching quiz scores:', error);
      setError('Error fetching quiz scores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserQuizScores();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="OUTER_CONTAINER">
        <Sidebar />
        <div className="INNER_CONTAINER">
          <h2>User Quiz Scores</h2>
          <div className="loading">Loading quiz scores...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="OUTER_CONTAINER">
        <Sidebar />
        <div className="INNER_CONTAINER">
          <h2>User Quiz Scores</h2>
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="OUTER_CONTAINER">
      <Sidebar />
      <div className="INNER_CONTAINER">
        <div className="quiz-scores-header">
          <h2>User Quiz Scores</h2>
          <div className="summary-stats">
            <div className="stat-card">
              <h3>{userScores.length}</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-card">
              <h3>{userScores.reduce((sum, user) => sum + user.totalQuizzes, 0)}</h3>
              <p>Total Quizzes</p>
            </div>
            <div className="stat-card">
              <h3>{userScores.length > 0 ? Math.round(userScores.reduce((sum, user) => sum + user.averagePercentage, 0) / userScores.length) : 0}%</h3>
              <p>Average Score</p>
            </div>
          </div>
        </div>

        {userScores.length === 0 ? (
          <div className="no-data">
            <p>No quiz results found. Users haven't attempted any quizzes yet.</p>
          </div>
        ) : (
          <div className="users-scores-container">
            {userScores.map((user) => (
              <div key={user.userId} className="user-score-card">
                <div className="user-header">
                  <h3>{user.username}</h3>
                  <div className="user-stats">
                    <span className="stat">{user.totalQuizzes} quizzes</span>
                    <span className="stat">Avg: {user.averagePercentage}%</span>
                    <span className="stat">Last: {user.lastQuizDate ? formatDate(user.lastQuizDate) : 'Never'}</span>
                  </div>
                </div>
                
                <div className="quizzes-list">
                  {user.quizzes.map((quiz, index) => (
                    <div key={index} className="quiz-item">
                      <div className="quiz-info">
                        <h4>{quiz.courseName}</h4>
                        <p className="quiz-date">{formatDate(quiz.submittedAt)}</p>
                      </div>
                      <div className="quiz-score">
                        <span className="score">{quiz.score}/{quiz.totalQuestions}</span>
                        <span className={`percentage ${quiz.percentage >= 70 ? 'good' : quiz.percentage >= 50 ? 'average' : 'poor'}`}>
                          {quiz.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuizScores;
