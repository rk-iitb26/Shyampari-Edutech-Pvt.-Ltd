const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Signup
exports.signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: "Email already registered" });

        const user = await User.create({ fullName, email, password });
        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, fullName: user.fullName, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

        res.status(200).json({
            success: true,
            token: generateToken(user._id),
            user: { id: user._id, fullName: user.fullName, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
