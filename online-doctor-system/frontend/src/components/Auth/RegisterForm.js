import React from "react";

const RegisterForm = ({ formData, handleChange, handleRegister }) => {
  return (
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
      <button className="btn btn-success mt-2" type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
