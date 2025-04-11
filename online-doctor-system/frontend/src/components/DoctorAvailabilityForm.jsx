import React, { useState } from 'react';
import axios from 'axios';

const DoctorAvailabilityForm = () => {
  const [availableDates, setAvailableDates] = useState([
    { date: '', slots: [''] }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/availability/set', { availableDates }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    alert('Availability updated!');
  };

  return (
    <form onSubmit={handleSubmit}>
      {availableDates.map((entry, index) => (
        <div key={index}>
          <input
            type="date"
            value={entry.date}
            onChange={(e) => {
              const copy = [...availableDates];
              copy[index].date = e.target.value;
              setAvailableDates(copy);
            }}
          />
          {entry.slots.map((slot, idx) => (
            <input
              key={idx}
              type="time"
              value={slot}
              onChange={(e) => {
                const copy = [...availableDates];
                copy[index].slots[idx] = e.target.value;
                setAvailableDates(copy);
              }}
            />
          ))}
        </div>
      ))}
      <button type="submit">Save Availability</button>
    </form>
  );
};

export default DoctorAvailabilityForm;
