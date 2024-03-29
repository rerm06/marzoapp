const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      console.log(`Registration failed: Username ${username} already exists.`);
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log(`User ${username} registered successfully.`);
    res.status(201).send('User registered');
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).send('Error during registration');
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return next(err);
    }
    if (!user) {
      console.log('Login failed: No User Exists');
      return res.status(400).send('No User Exists');
    }
    req.logIn(user, err => {
      if (err) {
        console.error('Error during login:', err);
        return next(err);
      }
      console.log(`User ${user.username} logged in successfully.`);
      res.send('Successfully Authenticated');
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return next(err);
    }
    console.log('User logged out successfully.');
    res.send('User logged out');
  });
});

module.exports = router;