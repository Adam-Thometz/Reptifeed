import React, { useEffect, useState } from "react";
import ReptifeedApi from "../api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  document.title = `Al, users on Reptifeed`;

  useEffect(() => {
    async function getUsers() {
      const res = await ReptifeedApi.getAllUsers();
      setUsers(res);
    };
    getUsers();
  }, []);

  return (
    <div className="AdminUsers">
      <h1>All users on Reptifeed</h1>
      {users.map(u => (
        <div className="AdminUsers-user">
          <p>User #{u.id}: {u.username} {u.isAdmin ? <b>Admin</b> : null}</p>
          <p>{u.email}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;