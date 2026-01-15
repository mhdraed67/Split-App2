const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('=== Server Starting ===');
console.log('Node environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT || 5000);

const { initializeDatabase } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('[1] Starting database initialization...');
    await initializeDatabase();
    console.log('[2] Database initialized successfully');
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`[3] Express server is listening on port ${PORT}`);
      console.log(`[4] Server running at http://localhost:${PORT}`);
    });
    
    server.on('error', (err) => {
      console.error('[ERROR] Server socket error:', err);
      process.exit(1);
    });
    
    process.on('uncaughtException', (err) => {
      console.error('[ERROR] Uncaught exception:', err);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('[FATAL] Failed to start server:', error);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

console.log('[0] Calling startServer()...');
startServer();

module.exports = app;
