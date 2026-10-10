const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    const existing = await db('users').where({ email: email.toLowerCase() }).first();
    if (existing) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Hash password and save user
    const hashed = await bcrypt.hash(password, 10);
    const [id] = await db('users').insert({
      name,
      email: email.toLowerCase(),
      password: hashed,
    });

    const user = { id, name, email: email.toLowerCase() };
    res.status(201).json({ message: 'Registration successful', token: createToken(user), user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await db('users').where({ email: email.toLowerCase() }).first();
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      token: createToken(user),
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};