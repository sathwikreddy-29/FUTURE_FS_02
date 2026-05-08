const express = require('express');
const { body, validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/leads
// @desc    Get all leads
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const leads = await Lead.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/leads
// @desc    Create a lead
// @access  Public (for contact form)
router.post('/', [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, source, notes } = req.body;

  try {
    const lead = await Lead.create({
      name,
      email,
      phone,
      source,
      notes
    });

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/leads/:id
// @desc    Update a lead
// @access  Private
router.put('/:id', [
  authMiddleware,
  body('status', 'Status must be new, contacted, or converted').optional().isIn(['new', 'contacted', 'converted'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { status, notes } = req.body;

  try {
    let lead = await Lead.findByPk(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Update fields
    if (status) lead.status = status;
    if (notes !== undefined) lead.notes = notes;

    await lead.save();
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/leads/:id
// @desc    Delete a lead
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    await lead.destroy();
    res.json({ message: 'Lead removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;