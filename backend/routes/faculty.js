// const express = require("express");
// const Teacher = require("../models/Teacher");
// const User = require("../models/User");

// const router = express.Router();

// // Register teacher
// router.post("/register-teacher", async (req, res) => {
//   const {
//     email, mobile, gender, education, subjects, mode, location
//   } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: "User not found" });
//     if (user.role !== "faculty") return res.status(400).json({ error: "User is not a faculty" });

//     const existingTeacher = await Teacher.findOne({ user: user._id });
//     if (existingTeacher) return res.status(400).json({ error: "Teacher profile already exists" });

//     const teacher = new Teacher({
//       user: user._id,
//       mobile,
//       gender,
//       education,
//       subjects,
//       role: "teacher",
//       mode,
//       location
//     });

//     await teacher.save();
//     res.status(201).json({ message: "Teacher registered successfully", teacher });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Get all teachers
// router.get("/", async (req, res) => {
//   try {
//     const teachers = await Teacher.find().populate("user", "fullName email role");
//     res.status(200).json(teachers);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// module.exports = router;
const express = require("express");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

// Apply auth middleware 
router.use(auth);

// ✅ Register Teacher
router.post("/register-teacher", async (req, res) => {
  const { email, mobile, gender, education, subjects, mode, location } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.role !== "faculty") return res.status(400).json({ error: "User is not a faculty" });

    const existingTeacher = await Teacher.findOne({ user: user._id });
    if (existingTeacher)
      return res.status(400).json({ error: "Teacher profile already exists" });

    const teacher = new Teacher({
      user: user._id,
      mobile,
      gender,
      education,
      subjects,
      role: "teacher",
      mode,
      location,
    });

    await teacher.save();
    res.status(201).json({ message: "Teacher registered successfully", teacher });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update Teacher Profile
router.put("/:id", async (req, res) => {
  try {
    const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Teacher not found" });
    res.json({ message: "Profile updated successfully", teacher: updated });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get All Teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("user", "fullName email role");
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
