const { pool } = require('../config/database');

class Expense {
  static async create(userId, description, amount, category, date, splitWith = null) {
    const [result] = await pool.execute(
      'INSERT INTO expenses (user_id, description, amount, category, date, split_with) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, description, amount, category, date, splitWith ? JSON.stringify(splitWith) : null]
    );
    return result.insertId;
  }

  static async getById(id, userId) {
    const [rows] = await pool.execute(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0];
  }

  static async getAllByUserId(userId, limit = 50, offset = 0) {
    // Ensure limit and offset are numbers and safe
    const limitNum = Math.max(1, Math.min(1000, parseInt(limit) || 50));
    const offsetNum = Math.max(0, parseInt(offset) || 0);
    
    // Use direct query for pagination (LIMIT/OFFSET can't be parameterized)
    const [rows] = await pool.query(
      `SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC LIMIT ${limitNum} OFFSET ${offsetNum}`,
      [userId]
    );
    return rows;
  }

  static async getByCategory(userId, category) {
    const [rows] = await pool.execute(
      'SELECT * FROM expenses WHERE user_id = ? AND category = ? ORDER BY date DESC',
      [userId, category]
    );
    return rows;
  }

  static async getByDateRange(userId, startDate, endDate) {
    const [rows] = await pool.execute(
      'SELECT * FROM expenses WHERE user_id = ? AND date BETWEEN ? AND ? ORDER BY date DESC',
      [userId, startDate, endDate]
    );
    return rows;
  }

  static async update(id, userId, description, amount, category, date, splitWith = null) {
    const [result] = await pool.execute(
      'UPDATE expenses SET description = ?, amount = ?, category = ?, date = ?, split_with = ? WHERE id = ? AND user_id = ?',
      [description, amount, category, date, splitWith ? JSON.stringify(splitWith) : null, id, userId]
    );
    return result.affectedRows > 0;
  }

  static async delete(id, userId) {
    const [result] = await pool.execute(
      'DELETE FROM expenses WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }

  static async getTotalByCategory(userId) {
    const [rows] = await pool.execute(
      'SELECT category, SUM(amount) as total FROM expenses WHERE user_id = ? GROUP BY category',
      [userId]
    );
    return rows;
  }

  static async getTotalExpense(userId) {
    const [rows] = await pool.execute(
      'SELECT SUM(amount) as total FROM expenses WHERE user_id = ?',
      [userId]
    );
    return rows[0];
  }

  static async search(userId, query) {
    const [rows] = await pool.execute(
      'SELECT * FROM expenses WHERE user_id = ? AND (description LIKE ? OR category LIKE ?) ORDER BY date DESC',
      [userId, `%${query}%`, `%${query}%`]
    );
    return rows;
  }
}

module.exports = Expense;
