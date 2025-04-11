const express = require('express');
const router = express.Router();
const DoctorAvailability = require('../models/DoctorAvailability');
const authMiddleware = require('../middleware/authMiddleware');

// ⏱️ Set Availability
router.post('/set', authMiddleware(['doctor']), async (req, res) => {
  try {
    const { availableDates } = req.body;
    const doctorId = req.user.id;

    const existing = await DoctorAvailability.findOne({ doctorId });
    if (existing) {
      existing.availableDates = availableDates;
      await existing.save();
    } else {
      await DoctorAvailability.create({ doctorId, availableDates });
    }

    res.status(200).json({ message: 'Availability updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error setting availability' });
  }
});

// 📅 Get Availability (for patients to view)
router.get('/get/:doctorId', async (req, res) => {
  try {
    const availability = await DoctorAvailability.findOne({ doctorId: req.params.doctorId });
    res.status(200).json(availability);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching availability' });
  }
});

module.exports = router;
