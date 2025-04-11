import React from 'react';
import DoctorAvailabilityForm from '../components/DoctorAvailabilityForm';
import BookAppointmentForm from '../components/BookAppointmentForm';
import ViewAppointments from '../components/ViewAppointments';
import PayNowButton from '../components/PayNowButton';

const Dashboard = ({ role }) => {
  return (
    <div>
      <h1>{role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}</h1>

      {role === 'doctor' && <DoctorAvailabilityForm />}
      {role === 'patient' && (
        <>
          <BookAppointmentForm doctorId="DOCTOR_OBJECT_ID_HERE" />
          <PayNowButton amount={20} />
        </>
      )}
      
      <ViewAppointments role={role} />
    </div>
  );
};

export default Dashboard;
