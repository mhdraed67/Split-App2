const Expense = require('../models/Expense');

exports.createExpense = async (req, res) => {
  try {
    const { description, amount, category, date, splitWith } = req.body;
    const userId = req.userId;

    const expenseId = await Expense.create(userId, description, amount, category, date, splitWith);

    res.status(201).json({
      message: 'Expense created successfully',
      expense: { id: expenseId, ...req.body },
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 50, offset = 0 } = req.query;

    const expenses = await Expense.getAllByUserId(userId, parseInt(limit), parseInt(offset));

    res.status(200).json({
      message: 'Expenses fetched successfully',
      expenses,
      count: expenses.length,
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const expense = await Expense.getById(id, userId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.split_with) {
      expense.split_with = JSON.parse(expense.split_with);
    }

    res.status(200).json({ expense });
  } catch (error) {
    console.error('Get expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category, date, splitWith } = req.body;
    const userId = req.userId;

    const updated = await Expense.update(id, userId, description, amount, category, date, splitWith);

    if (!updated) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({
      message: 'Expense updated successfully',
      expense: { id, ...req.body },
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deleted = await Expense.delete(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpensesByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const userId = req.userId;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const expenses = await Expense.getByCategory(userId, category);

    res.status(200).json({
      message: 'Expenses fetched successfully',
      expenses,
      count: expenses.length,
    });
  } catch (error) {
    console.error('Get expenses by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpensesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.userId;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required' });
    }

    const expenses = await Expense.getByDateRange(userId, startDate, endDate);

    res.status(200).json({
      message: 'Expenses fetched successfully',
      expenses,
      count: expenses.length,
    });
  } catch (error) {
    console.error('Get expenses by date range error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTotalByCategory = async (req, res) => {
  try {
    const userId = req.userId;

    const totals = await Expense.getTotalByCategory(userId);

    res.status(200).json({
      message: 'Category totals fetched successfully',
      totals,
    });
  } catch (error) {
    console.error('Get totals by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTotalExpense = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await Expense.getTotalExpense(userId);

    res.status(200).json({
      message: 'Total expense fetched successfully',
      total: result.total || 0,
    });
  } catch (error) {
    console.error('Get total expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchExpenses = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.userId;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const expenses = await Expense.search(userId, query);

    res.status(200).json({
      message: 'Search results fetched successfully',
      expenses,
      count: expenses.length,
    });
  } catch (error) {
    console.error('Search expenses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
