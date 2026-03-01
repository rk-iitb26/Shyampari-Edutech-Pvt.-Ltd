const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const auth = require("../middleware/auth");

// ── Apply auth middleware ──
router.use(auth);

// ── POST /api/requests  →  Student sends connection request to a faculty ──
router.post("/", async (req, res) => {
    try {
        const { facultyId } = req.body;
        const studentUserId = req.user; // Use authenticated user ID

        if (!facultyId) {
            return res.status(400).json({ message: "facultyId is required" });
        }

        // Find student record by owner user ID
        const studentRecord = await Student.findOne({ user: studentUserId });

        if (!studentRecord) {
            return res.status(404).json({ message: "Student profile not found. Please complete your profile first." });
        }

        // Find faculty record
        const facultyRecord = await Teacher.findById(facultyId).populate("user");
        if (!facultyRecord) {
            return res.status(404).json({ message: "Faculty not found." });
        }

        // Check for existing request
        const existing = await Request.findOne({
            student: studentRecord._id,
            faculty: facultyRecord._id,
        });

        if (existing) {
            if (existing.status === "rejected") {
                existing.status = "pending";
                await existing.save();
                return res.status(200).json({ message: "Request re-sent.", request: existing });
            }
            return res.status(409).json({
                message: `Request already ${existing.status}.`,
                status: existing.status,
            });
        }

        const newRequest = new Request({
            student: studentRecord._id,
            faculty: facultyRecord._id,
            studentUser: studentUserId,
            facultyUser: facultyRecord.user._id,
        });

        await newRequest.save();
        res.status(201).json({ message: "Request sent successfully.", request: newRequest });
    } catch (err) {
        console.error("Error sending request:", err);
        res.status(500).json({ message: "Server error." });
    }
});

// ── GET /api/requests?facultyEmail=...  →  Faculty sees their incoming requests ──
router.get("/", async (req, res) => {
    try {
        const { facultyEmail, studentEmail } = req.query;

        let filter = {};

        if (facultyEmail) {
            const user = await User.findOne({ email: facultyEmail });
            if (!user) return res.json([]);
            const facultyProfile = await Teacher.findOne({ user: user._id });
            if (!facultyProfile) return res.json([]);
            filter.faculty = facultyProfile._id;
        }

        if (studentEmail) {
            const user = await User.findOne({ email: studentEmail });
            if (!user) return res.json([]);
            const studentProfile = await Student.findOne({ user: user._id });
            if (!studentProfile) return res.json([]);
            filter.student = studentProfile._id;
        }

        const requests = await Request.find(filter)
            .populate("student")
            .populate("studentUser")
            .populate({ path: "faculty", populate: { path: "user" } })
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (err) {
        console.error("Error fetching requests:", err);
        res.status(500).json({ message: "Server error." });
    }
});

// ── PUT /api/requests/:id  →  Faculty accepts or rejects a request ──
router.put("/:id", async (req, res) => {
    try {
        const { status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Status must be 'accepted' or 'rejected'." });
        }

        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
            .populate("student")
            .populate("studentUser")
            .populate({ path: "faculty", populate: { path: "user" } });

        if (!request) return res.status(404).json({ message: "Request not found." });

        res.json({ message: `Request ${status}.`, request });
    } catch (err) {
        console.error("Error updating request:", err);
        res.status(500).json({ message: "Server error." });
    }
});

// ── DELETE /api/requests/:id  →  Student withdraws a request ──
router.delete("/:id", async (req, res) => {
    try {
        await Request.findByIdAndDelete(req.params.id);
        res.json({ message: "Request withdrawn." });
    } catch (err) {
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
