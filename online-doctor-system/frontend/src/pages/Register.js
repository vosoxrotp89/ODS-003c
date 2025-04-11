import React, { useState } from "react";
import API from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Patient"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Registration successful. You can now log in.");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          className="form-control my-2"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="form-control my-2"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <select
          className="form-control my-2"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
        </select>
        <button className="btn btn-success mt-2" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
