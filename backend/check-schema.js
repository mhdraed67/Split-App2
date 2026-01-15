const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'expense_splitter'
    });
    
    const [rows] = await conn.execute('DESCRIBE users');
    console.log('Users table columns:');
    rows.forEach(r => console.log(`  ${r.Field}: ${r.Type}`));
    
    conn.end();
  } catch(e) {
    console.error('Error:', e.message);
  }
})();
