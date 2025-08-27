const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Import bcryptjs here as well

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  // This route is working, no changes needed here.
  console.log('Received registration request for:', req.body.email);
  try {
    const { username, email, password, firstName, lastName, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log('Registration failed: User already exists.');
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }
    const user = new User({ username, email, password, firstName, lastName, role });
    await user.save();
    console.log(`Successfully saved new user: ${user.email}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('--- REGISTRATION ERROR ---', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});


// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', async (req, res) => {
    console.log('--- LOGIN ATTEMPT RECEIVED ---');
    try {
        const { email, password, role } = req.body;
        console.log(`[1/5] Received login request for email: ${email}`);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('[FAIL] User not found.');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log('[2/5] User found in database.');

        if (user.role !== role) {
            console.log(`[FAIL] Role mismatch. User is '${user.role}', attempted '${role}'.`);
            return res.status(400).json({ message: `Invalid user type. Please log in as a ${user.role}.` });
        }
        console.log('[3/5] User role matches.');
        
        console.log('[4/5] Attempting to compare password...');
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('[5/5] Password comparison complete.');

        if (!isMatch) {
            console.log('[FAIL] Password does not match.');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('--- LOGIN SUCCESSFUL ---');
        // If successful, send back user data (excluding password)
        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({
            message: 'Login successful',
            user: userResponse,
            token: 'dummy-jwt-token' // Placeholder for a real token
        });

    } catch (error) {
        console.error('--- LOGIN PROCESS CRASHED ---');
        console.error(error);
        res.status(500).json({ message: 'Server error during login process.' });
    }
});


module.exports = router;