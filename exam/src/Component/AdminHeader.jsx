import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AdminHeader = ({ setScreen }) => {
  const Navigate = useNavigate();
  return (
    <div className="w-full py-3 border-b flex justify-between px-10">
      <h1>Admin Panel</h1>
      <div className="flex gap-3">
        <button onClick={() => setScreen(1)}>Create User</button>
        <button onClick={() => setScreen(2)}>Edit User</button>
        <button
          onClick={() => {
            Cookies.remove("Admin");
            Navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
