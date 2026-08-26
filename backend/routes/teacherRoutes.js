const express = require('express');
const router = express.Router();
const { addTeacher, getAllTeachers, updateTeacher, deleteTeacher } = require('../controllers/teacherController');

// POST request: http://localhost:5000/api/teachers/add
router.post('/add', addTeacher);

// GET request: http://localhost:5000/api/teachers/all
router.get('/all', getAllTeachers);

// PUT request: http://localhost:5000/api/teachers/update/:id
router.put('/update/:id', updateTeacher);

// DELETE request: http://localhost:5000/api/teachers/delete/:id
router.delete('/delete/:id', deleteTeacher);

module.exports = router;