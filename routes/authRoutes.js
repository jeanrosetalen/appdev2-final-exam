const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const router = express.Router()

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;


router.post('/api/auth/signin', async (req, res) => {
    try {
        const {email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
        } 

        // Generate JWT token
        const token = jwt.sign(
        { userId: user._id },
        jwtSecret, 
        { expiresIn: '1h' }
        );

        res.json({ token });

    }catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

})

module.exports = router;


