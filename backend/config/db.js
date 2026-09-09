const mysql = require('mysql2');

// Using the single DATABASE_URL string from TiDB Cloud
const db = mysql.createPool({
  uri: process.env.DATABASE_URL,
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