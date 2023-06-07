import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";

export const Donation = () => {
  const [data, setData] = useState({});

  const HandleChange = (e) => {
    const Name = e.target.name;
    const Value = e.target.value;
    setData({ ...data, [Name]: Value });
  };
  const HandleClick = (e) => {
    e.preventDefault();
    const token = Cookies.get("User");

    var config = {
      method: "post",
      url: "http://localhost:3001/devotee/donation",
      headers: {
        token,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        alert("Donation Added Successfuly");
      })
      .catch(function (error) {
        alert("Something Went Wrong !");
      });
  };

  const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const Year = [2023, 2024, 2025];
  return (
    <form
      className="border rounded-lg m-auto mt-10 w-max p-10"
      onSubmit={HandleClick}
    >
      <input
        required
        onChange={HandleChange}
        className="border p-1 rounded-md w-full mt-3"
        type="number"
        placeholder="Amount"
        name="amount"
      />

      <select
        onChange={HandleChange}
        className="py-1 w-full border bg-white mt-3 mr-3"
        name="month"
        id=""
      >
        {Month.map((month) => {
          return <option value={month}>{month}</option>;
        })}
      </select>

      <select
        onChange={HandleChange}
        className="py-1 w-full border bg-white mt-3"
        name="year"
        id=""
      >
        {Year.map((i) => {
          return <option value={i}>{i}</option>;
        })}
      </select>

      <button
        type="submit"
        // onClick={(e) => HandleClick(e)}
        className="w-full py-1 text-center text-white bg-orange-600 font-semibold rounded-md mt-3"
      >
        Donate
      </button>
    </form>
  );
};
