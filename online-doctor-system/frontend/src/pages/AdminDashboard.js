import React, { useEffect, useState } from "react";
import API from "../api";

const AdminDashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/admin/dashboard");
        setMessage(res.data.message);
      } catch (err) {
        setMessage("Error loading dashboard");
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;
