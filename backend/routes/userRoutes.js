const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/User")
const router = express.Router();


router.post('/signUp', async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        // Ensure all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        // Return server error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Fetch user by email
router.get('/user', async (req, res) => {
    try {
        const { email } = req.query;

        // Ensure the email is provided in query parameters
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data (without the password)
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router