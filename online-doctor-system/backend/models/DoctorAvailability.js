const mongoose = require('mongoose');

const doctorAvailabilitySchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  availableDates: [
    {
      date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
      slots: [String], // Format: ['10:00', '11:30']
    },
  ],
});

module.exports = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);
