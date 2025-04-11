import React, { useState } from 'react';
import axios from 'axios';

const BookAppointmentForm = ({ doctorId }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/appointments/book', {
      doctorId, date, time
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    alert('Appointment Booked');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookAppointmentForm;
