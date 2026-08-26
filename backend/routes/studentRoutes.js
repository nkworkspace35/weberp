const express = require('express');
const router = express.Router();

const { addStudent, getAllStudents, deleteStudent, updateStudent } = require('../controllers/studentController');

// POST request: http://localhost:5000/api/students/add
router.post('/add', addStudent);

// GET request: http://localhost:5000/api/students/all
router.get('/all', getAllStudents);

// DELETE request: http://localhost:5000/api/students/delete/:id
router.delete('/delete/:id', deleteStudent);

// PUT request: http://localhost:5000/api/students/update/:id
router.put('/update/:id', updateStudent);

module.exports = router;