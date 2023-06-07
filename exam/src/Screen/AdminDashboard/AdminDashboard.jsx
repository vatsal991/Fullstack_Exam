import React, { useEffect, useState } from "react";
import { CreatUser } from "./CreatUser";
import { AdminHeader } from "../../Component/AdminHeader";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { EditUser } from "./EditUser";

export const AdminDashboard = () => {
  const [Screen, setScreen] = useState(1);

  // Redirecting User If Not Admin
  const Navigate = useNavigate();
  useEffect(() => {
    const cookie = Cookies.get("Admin");
    if (!cookie) Navigate("/login");
  });

  return (
    <div className="w-full">
      <AdminHeader setScreen={setScreen} />
      {Screen === 1 && <CreatUser />}
      {Screen === 2 && <EditUser />}
    </div>
  );
};
