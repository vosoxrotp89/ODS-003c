import React from "react";

const LoginForm = ({ email, password, setEmail, setPassword, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <input
        className="form-control my-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control my-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary mt-2" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
