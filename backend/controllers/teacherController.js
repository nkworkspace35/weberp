const db = require('../config/db');

// 1. ADD TEACHER
const addTeacher = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, department } = req.body;

        if (!first_name || !last_name || !email) {
            return res.status(400).json({ success: false, message: "First name, last name, and email are required." });
        }

        const teacherCode = 'TCH' + Date.now();
        const query = `INSERT INTO teachers (teacher_code, first_name, last_name, email, phone, department) VALUES (?, ?, ?, ?, ?, ?)`;
        
        await db.query(query, [teacherCode, first_name, last_name, email, phone, department]);
        res.status(201).json({ success: true, message: "Teacher added successfully." });

    } catch (error) {
        console.error("Add Teacher Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 2. GET ALL TEACHERS
const getAllTeachers = async (req, res) => {
    try {
        const [teachers] = await db.query("SELECT * FROM teachers ORDER BY id DESC");
        res.status(200).json({ success: true, data: teachers });
    } catch (error) {
        console.error("Get Teachers Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 3. UPDATE TEACHER
const updateTeacher = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, department } = req.body;
        const query = `UPDATE teachers SET first_name = ?, last_name = ?, email = ?, phone = ?, department = ? WHERE id = ?`;
        
        const [result] = await db.query(query, [first_name, last_name, email, phone, department, req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Teacher not found." });
        }
        res.status(200).json({ success: true, message: "Teacher updated successfully." });

    } catch (error) {
        console.error("Update Teacher Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// 4. DELETE TEACHER
const deleteTeacher = async (req, res) => {
    try {
        const query = "DELETE FROM teachers WHERE id = ?";
        const [result] = await db.query(query, [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Teacher not found." });
        }
        res.status(200).json({ success: true, message: "Teacher deleted successfully." });

    } catch (error) {
        console.error("Delete Teacher Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = { addTeacher, getAllTeachers, updateTeacher, deleteTeacher };