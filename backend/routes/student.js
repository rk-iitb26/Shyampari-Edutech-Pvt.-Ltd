// const express = require("express");
// const Student = require("../models/Student");
// const User = require("../models/User");

// const router = express.Router();

// // Register student details
// router.post("/register-student", async (req, res) => {
//     const { email, mobile, gender, standard, board, subjects, mode, location } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ error: "User not found" });
//         if (user.role !== "student") return res.status(400).json({ error: "User is not a student" });

//         const existingStudent = await Student.findOne({ user: user._id });
//         if (existingStudent) return res.status(400).json({ error: "Student profile already exists" });

//         const student = new Student({
//             user: user._id,
//             mobile,
//             gender,
//             standard,
//             board,
//             subjects,
//             mode,
//             location
//         });

//         await student.save();
//         res.status(201).json({ message: "Student registered successfully", student });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Server error" });
//     }
// });

// // Get all students
// router.get("/", async (req, res) => {
//     try {
//         const students = await Student.find().populate("user", "fullName email role");
//         res.status(200).json(students);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Server error" });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Student = require("../models/Student"); // Make sure your Student model exists
const User = require("../models/User"); // Optional if you relate student to user
const auth = require("../middleware/auth");

router.use(auth);

// ---------------------------
// GET all students
// ---------------------------
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate("user", "fullName email role");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------------------
// GET single student by ID
// ---------------------------
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------------------
// POST register student
// ---------------------------
router.post("/register-student", async (req, res) => {
  try {
    const { email, course, mobile, mode, subjects, location } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if student already exists
    const existing = await Student.findOne({ user: user._id });
    if (existing) {
      return res.status(400).json({ message: "Student profile already exists" });
    }

    const newStudent = new Student({
      user: user._id,
      course,
      mobile,
      mode,
      subjects,
      location,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------------------
// PUT update student
// ---------------------------
router.put("/:id", async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    // If the email is passed, we might want to verify it still matches or just ignore it 
    // since the 'user' ref is already set. We ignore it to avoid schema mismatch.

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("user", "fullName email role");

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
