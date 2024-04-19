// studentController.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      role: "student",
    });
    const savedUser = await newUser.save();

    const newStudent = new Student({
      userId: savedUser._id,
      fullName: req.body.fullName,
      gender: req.body.gender,
      onlineOrPakistan: req.body.onlineOrPakistan,
      city: req.body.city,
      contactNo: req.body.contactNo,
      address: req.body.address,
    });
    await newStudent.save();

    res
      .status(201)
      .json({ message: "Student registered successfully", data: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({
        message: "Student updated successfully",
        student: updatedStudent,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res
      .status(200)
      .json({
        message: "Student deleted successfully",
        student: deletedStudent,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
