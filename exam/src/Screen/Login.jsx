import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [userForm, setUserForm] = useState(false);
  return (
    <div className="p-5 border w-[250px] m-auto mt-10 rounded-lg">
      {userForm ? (
        <UserForm setUserForm={setUserForm} />
      ) : (
        <AdminForm setUserForm={setUserForm} />
      )}
    </div>
  );
};

const AdminForm = ({ setUserForm }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const HandleClick = async () => {
    const Res = await axios.post("http://localhost:3001/auth/adminLogin", data);
    if (Res.status === 200) {
      console.log(Res.data.token);
      alert("Login successfull");
      Cookies.remove("User");
      Cookies.set("Admin", Res.data.token);
      navigate("/dashboard/admin");
    } else {
      alert(Res.data);
    }
  };

  return (
    <div className="rounded-lg flex flex-col gap-3">
      <p className="text-center font-semibold text-slate-600">Admin Login</p>
      <input
        className="border p-1 rounded-md"
        onChange={HandleChange}
        type="text"
        placeholder="UserName"
        name="username"
      />
      <input
        className="border p-1 rounded-md"
        onChange={HandleChange}
        type="password"
        placeholder="password"
        name="password"
      />
      <button
        className="bg-orange-600 font-semibold text-white py-1 rounded-lg"
        onClick={HandleClick}
      >
        Login
      </button>
      <button
        className="bg-orange-600 font-semibold text-white py-1 rounded-lg"
        onClick={() => setUserForm(true)}
      >
        Devotee Login
      </button>
    </div>
  );
};

const UserForm = ({ setUserForm }) => {
  const [data, setData] = useState({});
  const [otpScreen, setScreen] = useState(true);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const HandleClick = async () => {
    const Res = await axios.post(
      "http://localhost:3001/auth/devoteeLogin",
      data
    );
    if (Res.status === 200) {
      alert("Otp sent !");
      setScreen(false);
    } else alert(Res.data);
  };

  const HandleOTPEnter = async () => {
    const NewData = {
      email: data.email,
      otp: otp,
    };
    const Res = await axios.post(
      "http://localhost:3001/auth/verifyOTP",
      NewData
    );
    if (Res.status === 200) {
      alert("login successfull");
      navigate("/dashboard/devotee");
      Cookies.remove("Admin");
      Cookies.set("User", Res.data.token);
    } else alert(Res.data);
  };

  return (
    <div className="rounded-lg flex flex-col gap-3">
      {otpScreen ? (
        <>
          <p className="text-center font-semibold text-slate-600">
            Devotee Login
          </p>
          <input
            className="border p-1 rounded-md"
            onChange={HandleChange}
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="border p-1 rounded-md"
            onChange={HandleChange}
            type="password"
            placeholder="password"
            name="password"
          />
          <button
            className="bg-orange-600 font-semibold text-white py-1 rounded-lg"
            onClick={HandleClick}
          >
            Continue
          </button>
          <button
            className="bg-orange-600 font-semibold text-white py-1 rounded-lg"
            onClick={() => setUserForm(false)}
          >
            Admin Login
          </button>
        </>
      ) : (
        <div>
          <p className="text-center font-semibold text-slate-600">Enter OTP</p>
          <input
            className="border p-1 rounded-md w-full mt-5"
            onChange={(e) => setOTP(e.target.value)}
            type="password"
            placeholder="password"
            name="password"
          />
          <button
            className="bg-orange-600 font-semibold text-white py-1 rounded-lg w-full mt-3"
            onClick={HandleOTPEnter}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
