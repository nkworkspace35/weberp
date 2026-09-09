const mysql = require('mysql'); // Use 'mysql2' if you installed the mysql2 package

// TiDB Database Connection (with SSL and Port 4000)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'test',
  port: process.env.DB_PORT || 4000,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
});

// Connection Test Check
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("MySQL connected successfully to TiDB Cloud!");
    connection.release();
  }
});

module.exports = db;