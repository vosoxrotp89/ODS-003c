const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/authMiddleware');

// 📅 Book Appointment
router.post('/book', authMiddleware(['patient']), async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorId,
      date,
      time,
    });
    res.status(200).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

// 🧑‍⚕️ Doctor: View Appointments
router.get('/doctor', authMiddleware(['doctor']), async (req, res) => {
    try {
      const appointments = await Appointment.find({ doctorId: req.user.id }).populate('patientId', 'name email');
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching appointments' });
    }
});
  
// 👤 Patient: View Appointments
router.get('/patient', authMiddleware(['patient']), async (req, res) => {
    try {
      const appointments = await Appointment.find({ patientId: req.user.id }).populate('doctorId', 'name email');
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching appointments' });
    }
});
  

module.exports = router;
