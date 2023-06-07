import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";

export const CreatUser = () => {
  // Form Data State
  const [data, setData] = useState({});

  //   Handling  Changes in form
  const HandleChange = (e) => {
    const name = e.target.name;
    if (name === "Image") {
      //   const value = e.target.files;
      setData({
        ...data,
        [name]:
          "https://api-private.atlassian.com/users/5d26d27b9df1b4365a4173bd32919f23/avatar",
      });
    } else {
      const value = e.target.value;
      setData({ ...data, [name]: value });
    }
  };

  //   Handle Function for click
  const HandleClick = async (e) => {
    e.preventDefault();
    const token = Cookies.get("Admin");
    const res = await axios.post("http://localhost:3001/admin/addUser", data, {
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      alert("User Created !");
      window.location.reload(false);
    } else {
      alert(res.data);
    }
  };

  return (
    <form
      className="border rounded-lg m-auto mt-10 w-max p-10"
      onSubmit={HandleClick}
    >
      <div className=" flex gap-2">
        <input
          required
          onChange={HandleChange}
          className="border p-1 rounded-md w-1/3"
          type="text"
          placeholder="First Name"
          name="Fname"
        />
        <input
          required
          onChange={HandleChange}
          className="border p-1 rounded-md w-1/3"
          type="text"
          placeholder="Middle Name"
          name="MName"
        />
        <input
          required
          onChange={HandleChange}
          className="border p-1 rounded-md w-1/3"
          type="text"
          placeholder="Last Name"
          name="Lname"
        />
      </div>

      <input
        required
        onChange={HandleChange}
        className="border p-2 rounded-md w-full mt-3"
        type="file"
        name="Image"
      />

      <div className="flex gap-2 mt-3">
        <input
          required
          onChange={HandleChange}
          className="border p-1 rounded-md w-1/3"
          type="text"
          placeholder="Flate Number"
          name="Flate"
        />
        <input
          required
          onChange={HandleChange}
          className="border p-1 rounded-md w-1/3"
          type="text"
          placeholder="Area"
          name="Area"
        />
        <input
          required
          onChange={HandleChange}
          className="border p-1 rounded-md w-1/3"
          type="text"
          placeholder="State"
          name="State"
        />
      </div>

      <div className=" flex gap-2 mt-3">
        <input
          required
          onChange={HandleChange}
          className="border p-1 rounded-md w-1/2"
          type="text"
          placeholder="City"
          name="City"
        />
        <input
          required
          //   pattern="/^[0-9]{6}/"
          onChange={HandleChange}
          className="border p-1 rounded-md w-1/2"
          type="number"
          placeholder="Pin code"
          name="Pin"
        />
      </div>

      <input
        required
        onChange={HandleChange}
        className="border p-1 rounded-md w-full mt-3"
        type="email"
        placeholder="Email"
        name="Email"
      />

      <input
        required
        onChange={HandleChange}
        className="border p-1 rounded-md w-full mt-3"
        type="date"
        placeholder="Initiation"
        name="Initiation"
      />

      <button
        type="submit"
        // onClick={(e) => HandleClick(e)}
        className="w-full py-1 text-center text-white bg-orange-600 font-semibold rounded-md mt-3"
      >
        Save
      </button>
    </form>
  );
};
