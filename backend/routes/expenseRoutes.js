const express = require('express');
const { body } = require('express-validator');
const expenseController = require('../controllers/expenseController');
const errorHandler = require('../middleware/errorHandler');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Create expense
router.post(
  '/',
  [
    body('description').notEmpty().withMessage('Description is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('category').notEmpty().withMessage('Category is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
  ],
  errorHandler,
  expenseController.createExpense
);

// Stats routes (must be before /:id route)
router.get('/stats/total', expenseController.getTotalExpense);
router.get('/stats/category', expenseController.getTotalByCategory);

// Filter routes (must be before /:id route)
router.get('/filter/category', expenseController.getExpensesByCategory);
router.get('/filter/daterange', expenseController.getExpensesByDateRange);

// Search route (must be before /:id route)
router.get('/search', expenseController.searchExpenses);

// Get all expenses (generic route)
router.get('/', expenseController.getExpenses);

// Get expense by ID (most specific route goes last)
router.get('/:id', expenseController.getExpenseById);

// Update expense
router.put(
  '/:id',
  [
    body('description').notEmpty().withMessage('Description is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('category').notEmpty().withMessage('Category is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
  ],
  errorHandler,
  expenseController.updateExpense
);

// Delete expense
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
