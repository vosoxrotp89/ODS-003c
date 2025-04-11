import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      const role = res.data.user.role;
      if (role === "Doctor") navigate("/doctor/dashboard");
      else if (role === "Patient") navigate("/patient/dashboard");
      else if (role === "Admin") navigate("/admin/dashboard");
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control my-2"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control my-2"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary mt-2" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
