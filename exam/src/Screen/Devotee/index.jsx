import React, { useEffect, useState } from "react";
import { DevoteeHeader } from "../../Component/DevoteeHeader";
import { Donation } from "./Donation";
import { Profile } from "./Profile";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Index = () => {
  const [Screen, setScreen] = useState(1);

  //Redirecting To Login
  const Navigate = useNavigate();
  useEffect(() => {
    const cookie = Cookies.get("User");
    if (!cookie) Navigate("/login");
  });

  return (
    <div>
      <DevoteeHeader setScreen={setScreen} />
      {Screen === 1 && <Donation />}
      {Screen === 2 && <Profile />}
    </div>
  );
};
