const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Authenticate admin and get token
// @access  Public
router.post('/login', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/setup
// @desc    Create initial admin account if none exists
// @access  Public (requires setup secret)
router.post('/setup', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  body('setupSecret', 'Setup secret is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, setupSecret } = req.body;

  if (setupSecret !== process.env.SETUP_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const adminCount = await Admin.count();
    if (adminCount > 0) {
      return res.status(400).json({ message: 'Admin account already exists' });
    }

    const admin = await Admin.create({ email, password });
    res.json({ message: 'Admin account created', admin: { id: admin.id, email: admin.email } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;