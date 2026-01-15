const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const errorHandler = require('../middleware/errorHandler');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Signup route
router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  errorHandler,
  authController.signup
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  errorHandler,
  authController.login
);

// Get profile (protected)
router.get('/profile', authMiddleware, authController.getProfile);

// Update profile (protected)
router.put(
  '/profile',
  authMiddleware,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  errorHandler,
  authController.updateProfile
);

module.exports = router;
