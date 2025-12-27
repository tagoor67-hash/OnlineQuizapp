const express = require('express');
const adminController = require('../controllers/adminController'); // Import the controller
const router = express.Router();
//const isAdmin = require('../middlewares/authMiddleware');

// Admin authentication routes
router.post('/login', adminController.loginAdmin);
router.post('/register', adminController.registerAdmin);

// Route to fetch all non-admin users
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

// Route to fetch all users' quiz scores
router.get('/quiz-scores', adminController.getAllUserQuizScores);

module.exports = router;
