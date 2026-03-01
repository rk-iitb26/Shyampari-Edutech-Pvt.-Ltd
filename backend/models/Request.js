const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
        },
        studentUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        facultyUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
        message: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

// Prevent duplicate pending requests from same student to same faculty
requestSchema.index({ student: 1, faculty: 1 }, { unique: true });

module.exports = mongoose.model("Request", requestSchema);
