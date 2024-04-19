
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
exports.createTeacher = async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
        role: 'teacher'
      });
      const savedUser = await newUser.save();
  
      const newTeacher = new Teacher({
        userId: savedUser._id,
        fullName: req.body.fullName,
        gender: req.body.gender,
        age: req.body.age,
        teachingExperience: req.body.teachingExperience,
        minimumFeePackage: req.body.minimumFeePackage,
        personalContactNo: req.body.personalContactNo,
        boardType: req.body.boardType,
      });
      await newTeacher.save();
  
      res.status(201).json({ message: 'Teacher registered successfully',data:newTeacher });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  exports.getAllTeachers = async (req, res) => {
    try {
      const teachers = await Teacher.find();
      res.status(200).json({ teachers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getTeacherById = async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json({ teacher });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.updateTeacher = async (req, res) => {
    try {
      const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json({ message: 'Teacher updated successfully', teacher: updatedTeacher });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.deleteTeacher = async (req, res) => {
    try {
      const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
      if (!deletedTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
      res.status(200).json({ message: 'Teacher deleted successfully', teacher: deletedTeacher });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };