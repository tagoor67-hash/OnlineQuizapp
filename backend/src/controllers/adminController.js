const User = require('../models/User'); 
const Admin = require('../models/Admin'); 
const Result = require('../models/Result');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Check if admin exists in Admin collection
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Admin login successful',
      data: {
        token,
        user: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error during login',
      error: error.message 
    });
  }
};

// Admin registration
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required' 
      });
    }

    // Check if admin already exists in Admin collection
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin already exists with this email' 
      });
    }

    // Hash password and create admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ 
      name, 
      email, 
      password: hashedPassword
    });

    // Generate JWT Token
    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // Return success response
    return res.status(201).json({ 
      success: true,
      message: 'Admin registered successfully',
      data: {
        token,
        user: {
          id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: newAdmin.role
        }
      }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error during registration',
      error: error.message 
    });
  }
}; 

// Controller to get all non-admin users
exports.getAllUsers = async (req, res) => {
  try {
    // Since we have separate collections, get all users from User collection
    // (Admins are in Admin collection, Users are in User collection)
    const users = await User.find({}).select('-password'); // Exclude password field
    
    res.status(200).json({ 
      success: true,
      data: { users }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server Error' 
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Controller to get all users' quiz scores with user details
exports.getAllUserQuizScores = async (req, res) => {
  try {
    // Fetch all quiz results with user details populated
    const quizResults = await Result.find()
      .sort({ submittedAt: -1 }) // Sort by most recent first
      .exec();
    
    // Group results by user for better organization
    const userScores = {};
    
    quizResults.forEach(result => {
      if (!userScores[result.userId]) {
        userScores[result.userId] = {
          userId: result.userId,
          username: result.username,
          quizzes: []
        };
      }
      
      userScores[result.userId].quizzes.push({
        courseName: result.courseName,
        topicId: result.topicId,
        score: result.score,
        totalQuestions: result.totalQuestions || 10, // Default to 10 if null
        percentage: Math.round((result.score / (result.totalQuestions || 10)) * 100),
        submittedAt: result.submittedAt
      });
    });
    
    // Convert to array and calculate overall stats for each user
    const usersWithScores = Object.values(userScores).map(user => {
      const totalQuizzes = user.quizzes.length;
      const totalScore = user.quizzes.reduce((sum, quiz) => sum + quiz.score, 0);
      const totalQuestions = user.quizzes.reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
      const averagePercentage = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
      
      return {
        ...user,
        totalQuizzes,
        totalScore,
        totalQuestions,
        averagePercentage,
        lastQuizDate: user.quizzes.length > 0 ? user.quizzes[0].submittedAt : null
      };
    });
    
    res.status(200).json({ 
      success: true,
      data: { 
        users: usersWithScores,
        totalResults: quizResults.length
      }
    });
  } catch (error) {
    console.error('Error fetching user quiz scores:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server Error' 
    });
  }
};
