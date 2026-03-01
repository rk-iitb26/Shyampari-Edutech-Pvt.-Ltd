const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Student = require("./models/Student");
const Teacher = require("./models/Teacher");
const Request = require("./models/Request");
const Message = require("./models/Message");

dotenv.config();

const fixData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB...");

        // 1. Clean up Students with invalid User refs or old structure
        const students = await Student.find();
        for (const student of students) {
            // Check if student.user is an object (old structure) or an ID (new structure)
            if (student.user && typeof student.user === 'object' && student.user.email) {
                console.log(`Fixing student profile for: ${student.user.email}`);
                const realUser = await User.findOne({ email: student.user.email });
                if (realUser) {
                    student.user = realUser._id;
                    await student.save();
                } else {
                    console.log(`Deleting orphan student profile (no user found): ${student.user.email}`);
                    await Student.findByIdAndDelete(student._id);
                }
            } else if (student.user) {
                const userExists = await User.findById(student.user);
                if (!userExists) {
                    console.log(`Deleting student profile with missing User ref: ${student._id}`);
                    await Student.findByIdAndDelete(student._id);
                }
            }
        }

        // 2. Clean up Teachers with invalid User refs
        const teachers = await Teacher.find();
        for (const teacher of teachers) {
            if (teacher.user) {
                const userExists = await User.findById(teacher.user);
                if (!userExists) {
                    console.log(`Deleting teacher profile with missing User ref: ${teacher._id}`);
                    await Teacher.findByIdAndDelete(teacher._id);
                }
            }
        }

        // 3. Clean up Requests with missing participants
        const requests = await Request.find();
        for (const req of requests) {
            const studentExists = await Student.findById(req.student);
            const teacherExists = await Teacher.findById(req.faculty);
            const studentUserExists = await User.findById(req.studentUser);
            const facultyUserExists = await User.findById(req.facultyUser);

            if (!studentExists || !teacherExists || !studentUserExists || !facultyUserExists) {
                console.log(`Deleting invalid request: ${req._id}`);
                await Request.findByIdAndDelete(req._id);
            }
        }

        console.log("Data cleanup complete!");
        process.exit(0);
    } catch (err) {
        console.error("Error during cleanup:", err);
        process.exit(1);
    }
};

fixData();
