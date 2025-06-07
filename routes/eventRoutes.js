const express = require('express');
const jwt = require('jsonwebtoken');
const app = express()

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;


app.use(express.json())

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Public route to fetch all events
app.get('/api/events', (req, res) => {
    res.json({ message: 'Fetch all events that is publicly available' });
});

// Protected route to create a new event
app.post('/api/events', authenticateToken, (req, res) => {
    res.json({ message: 'Create a new event' });
});

// Protected route to fetch events created by the logged-in user
app.get('/api/my-events', authenticateToken, (req, res) => {
    res.json({ message: 'Fetch events created by the logged-in user' });
});

const port =  process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${PORT}`);
});


// module.exports = authenticateToken;

