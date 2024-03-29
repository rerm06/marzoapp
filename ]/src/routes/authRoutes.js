const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    await user.save();
    console.log(`User ${username} registered successfully.`);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in registration:', error.message, error.stack);
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      console.log(`User ${user.username} logged in successfully.`);
      res.json({ message: 'Login successful', token });
    } else {
      console.log('Invalid login attempt');
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in login:', error.message, error.stack);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;