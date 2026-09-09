const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
    res.json({
        success: true,
        project: "ERP Portal",
        message: "ERP Backend is running successfully",
        version: "1.0.0"
    });
});

// ================= TEST DB ROUTE =================
app.get("/api/test-db", async (req, res) => {
    try {
        const [result] = await db.query("SELECT 1 AS result");
        res.json({
            success: true,
            message: "MySQL connected successfully",
            database: result
        });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({
            success: false,
            message: "MySQL connection failed",
            error: error.message
        });
    }
});

// ================= API ROUTES =================
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log("====================================");
    console.log("        ERP PORTAL BACKEND        ");
    console.log("====================================");
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log("====================================");
});


module.exports = app;


