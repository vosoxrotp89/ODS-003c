import React from "react";
import { logout } from "../../utils/auth";

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <h3>{role} Menu</h3>
      <ul>
        <li>Dashboard</li>
        <li onClick={logout} style={{ cursor: "pointer", color: "red" }}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
