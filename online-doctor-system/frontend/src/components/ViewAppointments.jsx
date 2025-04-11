import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAppointments = ({ role }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await axios.get(`/api/appointments/${role}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAppointments(res.data);
    };
    fetchAppointments();
  }, [role]);

  return (
    <div>
      <h2>My Appointments</h2>
      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            Date: {a.date} Time: {a.time} - {role === 'doctor' ? a.patientId.name : a.doctorId.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAppointments;
