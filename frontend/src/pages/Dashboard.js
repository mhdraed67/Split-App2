import React, { useState, useEffect } from 'react';
import { expenseService } from '../services/apiService';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [error, setError] = useState('');

  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities', 'Health', 'Other'];

  // Use useCallback to memoize fetchExpenses and fetchTotals
  const fetchExpenses = React.useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (searchQuery) {
        data = await expenseService.searchExpenses(searchQuery);
      } else if (filterCategory) {
        data = await expenseService.getExpensesByCategory(filterCategory);
      } else {
        data = await expenseService.getExpenses();
      }
      setExpenses(data.expenses);
      setError('');
    } catch (err) {
      setError('Failed to fetch expenses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filterCategory]);

  const fetchTotals = React.useCallback(async () => {
    try {
      const [totalData, categoryData] = await Promise.all([
        expenseService.getTotalExpense(),
        expenseService.getTotalByCategory(),
      ]);
      const total = parseFloat(totalData.total) || 0;
      setTotalExpense(Number.isNaN(total) ? 0 : total);
      setCategoryTotals(categoryData.totals || []);
    } catch (err) {
      console.error('Failed to fetch totals:', err);
      setTotalExpense(0);
      setCategoryTotals([]);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
    fetchTotals();
  }, [fetchExpenses, fetchTotals]);

  const handleAddExpense = async (formData) => {
    try {
      await expenseService.createExpense(
        formData.description,
        formData.amount,
        formData.category,
        formData.date
      );
      setShowForm(false);
      fetchExpenses();
      fetchTotals();
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateExpense = async (formData) => {
    try {
      await expenseService.updateExpense(
        editingExpense.id,
        formData.description,
        formData.amount,
        formData.category,
        formData.date
      );
      setEditingExpense(null);
      fetchExpenses();
      fetchTotals();
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(id);
        fetchExpenses();
        fetchTotals();
      } catch (err) {
        setError('Failed to delete expense');
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Expense Dashboard</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Expenses"
            value={`$${(totalExpense || 0).toFixed(2)}`}
            color="blue"
            icon="💰"
          />
          <StatCard
            title="Number of Expenses"
            value={expenses.length}
            color="green"
            icon="📊"
          />
          <StatCard
            title="Average Expense"
            value={`$${expenses.length > 0 ? ((totalExpense || 0) / expenses.length).toFixed(2) : '0.00'}`}
            color="purple"
            icon="📈"
          />
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
            <div className="space-y-3">
              {categoryTotals.length > 0 ? (
                categoryTotals.map(cat => (
                  <div key={cat.category} className="flex justify-between items-center">
                    <span className="text-gray-700">{cat.category}</span>
                    <span className="font-semibold text-blue-600">
                      ${parseFloat(cat.total).toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No expenses yet</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium mb-3"
            >
              {showForm ? 'Cancel' : '+ Add New Expense'}
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8">
            <ExpenseForm
              expense={editingExpense}
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Search & Filter</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {(searchQuery || filterCategory) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('');
              }}
              className="mt-3 text-blue-600 hover:text-blue-900 text-sm font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Expense List */}
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDeleteExpense}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
