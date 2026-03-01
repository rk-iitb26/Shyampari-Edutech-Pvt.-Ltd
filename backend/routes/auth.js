// import express from "express";
// import bcrypt from "bcryptjs";
// import User from "../models/User.js";

// const router = express.Router();

// // SIGNUP
// router.post("/signup", async (req, res) => {
//     const { fullName, email, password, role } = req.body;

//     if (!fullName || !email || !password || !role) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: "Email already in use." });

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({ fullName, email, password: hashedPassword, role });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error." });
//     }
// });

// // LOGIN WITHOUT JWT
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) return res.status(400).json({ message: "Email and password required." });

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid credentials." });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

//         res.json({ success: true, user: { fullName: user.fullName, email: user.email, role: user.role } });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error." });
//     }
// });

// export default router;
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role)
        return res.status(400).json({ message: "All fields are required." });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already in use." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ fullName, email, password: hashedPassword, role });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            token,
            user: { _id: newUser._id, fullName: newUser.fullName, email: newUser.email, role: newUser.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Email and password required." });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            success: true,
            token,
            user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});

// GET CURRENT USER
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
