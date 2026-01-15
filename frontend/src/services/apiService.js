import apiClient from './apiClient';

export const authService = {
  signup: async (name, email, password) => {
    const response = await apiClient.post('/auth/signup', { name, email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (name, email) => {
    const response = await apiClient.put('/auth/profile', { name, email });
    return response.data;
  },
};

export const expenseService = {
  createExpense: async (description, amount, category, date, splitWith = null) => {
    const response = await apiClient.post('/expenses', {
      description,
      amount,
      category,
      date,
      split_with: splitWith,
    });
    return response.data;
  },

  getExpenses: async (limit = 50, offset = 0) => {
    const response = await apiClient.get('/expenses', {
      params: { limit, offset },
    });
    return response.data;
  },

  getExpenseById: async (id) => {
    const response = await apiClient.get(`/expenses/${id}`);
    return response.data;
  },

  updateExpense: async (id, description, amount, category, date, splitWith = null) => {
    const response = await apiClient.put(`/expenses/${id}`, {
      description,
      amount,
      category,
      date,
      split_with: splitWith,
    });
    return response.data;
  },

  deleteExpense: async (id) => {
    const response = await apiClient.delete(`/expenses/${id}`);
    return response.data;
  },

  searchExpenses: async (query) => {
    const response = await apiClient.get('/expenses/search', {
      params: { query },
    });
    return response.data;
  },

  getExpensesByCategory: async (category) => {
    const response = await apiClient.get('/expenses/filter/category', {
      params: { category },
    });
    return response.data;
  },

  getExpensesByDateRange: async (startDate, endDate) => {
    const response = await apiClient.get('/expenses/filter/daterange', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  getTotalByCategory: async () => {
    const response = await apiClient.get('/expenses/stats/category');
    return response.data;
  },

  getTotalExpense: async () => {
    const response = await apiClient.get('/expenses/stats/total');
    return response.data;
  },
};
