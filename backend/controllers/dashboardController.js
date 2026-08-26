const db = require('../config/db');

const getDashboardStats = async (req, res) => {
    try {
        const [studentResult] = await db.query("SELECT COUNT(*) AS totalStudents FROM students");
        const totalStudents = studentResult[0].totalStudents;

        const [teacherResult] = await db.query("SELECT COUNT(*) AS totalTeachers FROM teachers");
        const totalTeachers = teacherResult[0].totalTeachers;

        res.status(200).json({
            success: true,
            data: {
                totalStudents: totalStudents,
                totalTeachers: totalTeachers
            }
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = { getDashboardStats };