// Teacher.js
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  teachingExperience: {
    type: Number,
    required: true,
  },
  minimumFeePackage: {
    type: Number,
    required: true,
  },
  personalContactNo: {
    type: String,
    required: true,
  },
  boardType: {
    type: String,
    required: true,
  },
  createAt:{
    type:Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Teacher", teacherSchema);
