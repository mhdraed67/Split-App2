const mysql = require('mysql2/promise');

(async () => {
  let conn;
  try {
    conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'expense_splitter'
    });
    
    console.log('1. Disabling foreign key checks...');
    await conn.execute('SET FOREIGN_KEY_CHECKS = 0');
    console.log('2. Dropping expense_splits...');
    await conn.execute('DROP TABLE IF EXISTS expense_splits');
    console.log('3. Dropping expenses...');
    await conn.execute('DROP TABLE IF EXISTS expenses');
    console.log('4. Dropping users...');
    await conn.execute('DROP TABLE IF EXISTS users');
    console.log('5. Re-enabling foreign key checks...');
    await conn.execute('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Database reset successfully');
  } catch(e) {
    console.error('Error:', e.message);
  } finally {
    if (conn) {
      await conn.end();
      console.log('Connection closed');
    }
  }
})();
