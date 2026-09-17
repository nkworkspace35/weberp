const { Pool } = require('pg');

// Supabase PostgreSQL Database Connection
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Connection Test Check
db.connect((err, client, release) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected successfully to Supabase PostgreSQL!");
    release(); 
  }
});

module.exports = db;