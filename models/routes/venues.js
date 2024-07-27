// routes/venues.js
const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');
const User = require('../models/User');

// Middleware to authenticate user
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

// Get all venues
router.get('/venues', isAuthenticated, async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Book a venue
router.post('/book', isAuthenticated, async (req, res) => {
  const { rowId, startTime, endTime } = req.body;
  try {
    const venue = await Venue.findById(rowId);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    venue.bookedBy = user.name;
    venue.bookedById = user.id;
    venue.startTime = startTime;
    venue.endTime = endTime;
    venue.availability = 'Booked';
    venue.contactNo = user.phno;

    await venue.save();
    res.json(venue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Free a venue
router.post('/free', isAuthenticated, async (req, res) => {
  const { rowId } = req.body;
  try {
    const venue = await Venue.findById(rowId);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    if (venue.bookedById !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to free this venue' });
    }

    venue.bookedBy = '--';
    venue.bookedById = null;
    venue.startTime = '';
    venue.endTime = '';
    venue.availability = 'FREE';
    venue.contactNo = '---';

    await venue.save();
    res.json(venue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
