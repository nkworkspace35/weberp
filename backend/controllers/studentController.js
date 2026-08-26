const db = require('../config/db');

// 1. ADD NEW STUDENT (POST API)
const addStudent = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, class_name } = req.body;

        // Validate required fields
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ 
                success: false, 
                message: "First name, last name, and email are required fields." 
            });
        }

        // Generate a unique student code automatically
        const student_code = "STU" + Date.now(); 

        // Insert student data into the database
        const query = `INSERT INTO students (student_code, first_name, last_name, email, phone, class_name) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(query, [student_code, first_name, last_name, email, phone, class_name]);

        // Return success response
        res.status(201).json({
            success: true,
            message: "Student added successfully.",
            studentId: result.insertId,
            studentCode: student_code
        });

    } catch (error) {
        console.error("Add Student Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while adding the student.", 
            error: error.message 
        });
    }
};
// 2. GET ALL STUDENTS (GET API)
const getAllStudents = async (req, res) => {
    try {
        // Database se sabhi students ko fetch karne ki SQL query
        const [students] = await db.query("SELECT * FROM students ORDER BY created_at DESC");
        
        res.status(200).json({ 
            success: true, 
            count: students.length, 
            data: students 
        });

    } catch (error) {
        console.error("Fetch Students Error:", error);
        res.status(500).json({ success: false, message: "Students fetch karne mein error aayi", error: error.message });
    }
};
// 3. DELETE STUDENT (DELETE API)
const deleteStudent = async (req, res) => {
    try {
        // Extract student ID from the URL parameters
        const studentId = req.params.id;
        
        // SQL query to delete the student
        const query = "DELETE FROM students WHERE id = ?";
        const [result] = await db.query(query, [studentId]);

        // Check if a row was actually deleted
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "Student not found in the database." 
            });
        }

        // Return success response
        res.status(200).json({ 
            success: true, 
            message: "Student deleted successfully." 
        });

    } catch (error) {
        console.error("Delete Student Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while deleting the student.", 
            error: error.message 
        });
    }
};
// 4. UPDATE STUDENT (PUT API)
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const { first_name, last_name, email, phone, class_name } = req.body;

        if (!first_name || !last_name || !email) {
            return res.status(400).json({ 
                success: false, 
                message: "First name, last name, and email are required fields." 
            });
        }

        const query = `UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, class_name = ? WHERE id = ?`;
        const [result] = await db.query(query, [first_name, last_name, email, phone, class_name, studentId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Student not found in the database." });
        }

        res.status(200).json({ success: true, message: "Student updated successfully." });

    } catch (error) {
        console.error("Update Student Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while updating the student.", 
            error: error.message 
        });
    }
};

module.exports = { addStudent, getAllStudents, deleteStudent, updateStudent };