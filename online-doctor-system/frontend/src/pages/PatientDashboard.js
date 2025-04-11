import React, { useEffect, useState } from "react";
import API from "../api";

const PatientDashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/patient/dashboard");
        setMessage(res.data.message);
      } catch (err) {
        setMessage("Error loading dashboard");
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default PatientDashboard;
