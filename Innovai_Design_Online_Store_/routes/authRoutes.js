const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient'); // Import Supabase client

router.get('/auth/register', (req, res) => {
  res.render('register');
});

router.post('/auth/register', async (req, res) => {
  const { email, password } = req.body; // Changed to email for Supabase auth
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error('Registration error:', error.message, error);
    return res.status(500).send(error.message);
  }

  console.log('User registered:', email);
  res.redirect('/auth/login');
});

router.get('/auth/login', (req, res) => {
  res.render('login');
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const { user, error } = await supabase.auth.signIn({ email, password });

  if (error) {
    console.error('Login error:', error.message, error);
    return res.status(400).send(error.message);
  }

  console.log('User logged in:', email);
  res.redirect('/');
});

router.get('/auth/logout', async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout error:', error.message, error);
    return res.status(500).send('Error logging out');
  }

  console.log('User logged out');
  res.redirect('/auth/login');
});

module.exports = router;