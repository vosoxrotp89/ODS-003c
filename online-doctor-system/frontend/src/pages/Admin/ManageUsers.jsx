import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, [refresh]);

  const toggleBlock = async (id) => {
    try {
      await axios.patch(
        `/api/admin/users/${id}/toggle-block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefresh(!refresh); // refetch users
    } catch (err) {
      console.error("Error toggling block status", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="py-2 px-4 border">{u.name}</td>
              <td className="py-2 px-4 border">{u.email}</td>
              <td className="py-2 px-4 border">{u.role}</td>
              <td className="py-2 px-4 border">
                {u.isBlocked ? "Blocked" : "Active"}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => toggleBlock(u._id)}
                  className={`px-3 py-1 rounded ${
                    u.isBlocked ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {u.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
