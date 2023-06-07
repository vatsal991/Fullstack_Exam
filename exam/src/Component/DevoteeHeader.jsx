import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";

export const DevoteeHeader = ({ setScreen }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-3 border-b flex justify-between px-10">
      <h1>Devotee Panel</h1>
      <div className="flex gap-3">
        <button onClick={() => setScreen(1)}>Pay Online</button>
        <button onClick={() => setScreen(2)}>Profile</button>
        <button
          onClick={() => {
            Cookies.remove("User");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
