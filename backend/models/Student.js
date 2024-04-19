// Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  onlineOrPakistan: {
    type: String,
    enum: ["online", "pakistan"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createAt:{
    type:Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Student", studentSchema);
