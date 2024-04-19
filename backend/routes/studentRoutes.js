const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Create Student
router.post('/register-student', studentController.createStudent);

// Read Students
router.get('/all-students', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);

// Update Student
router.put('/:id', studentController.updateStudent);

// Delete Student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
