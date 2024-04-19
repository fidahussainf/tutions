require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const initializeDefaultSuperadmin = require("./dbInit");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes"); 
const teacherRoutes = require("./routes/teacherRoutes")
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(process.env.MONGO_URL);
    initializeDefaultSuperadmin();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
const PORT = process.env.PORT || 5000;
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/auth", authRoutes); 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
