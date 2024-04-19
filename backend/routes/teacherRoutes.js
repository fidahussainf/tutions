const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Create Teacher
router.post('/register-teacher', teacherController.createTeacher);

// Read Teachers
router.get('/all-teachers', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);

// Update Teacher
router.put('/:id', teacherController.updateTeacher);

// Delete Teacher
router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;
