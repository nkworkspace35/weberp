const db = require('./config/db');

const createTables = async () => {
    try {
        console.log("Dropping old tables and creating new ones...");

        // Drop existing incorrect tables
        await db.query(`DROP TABLE IF EXISTS students`);
        await db.query(`DROP TABLE IF EXISTS teachers`);

        // 1. Create Students Table
        await db.query(`
            CREATE TABLE students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_code VARCHAR(50) NOT NULL,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(15) NOT NULL,
                class_name VARCHAR(20) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Students table created successfully with student_code!");

        // 2. Create Teachers Table
        await db.query(`
            CREATE TABLE teachers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                teacher_code VARCHAR(50),
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(15) NOT NULL,
                subject VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Teachers table created successfully with teacher_code!");

        console.log("========================================");
        console.log("Database tables are perfectly updated!");
        console.log("========================================");
        process.exit();

    } catch (error) {
        console.error("❌ Error updating tables:", error);
        process.exit(1);
    }
};

createTables();