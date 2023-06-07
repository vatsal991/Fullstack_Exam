import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const EditUser = () => {
  const [Users, setUsers] = useState([]);
  const [EditUser, setEdit] = useState(false);
  const [EditUserID, setEditID] = useState();
  const token = Cookies.get("Admin");

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    const Data = await axios.get("http://localhost:3001/admin/userList", {
      headers: { token: token },
    });
    setUsers(Data.data);
  };

  return (
    <div className="w-full flex items-center justify-center mt-10">
      <table>
        <tr>
          <th className="border py-2 px-4">ID</th>
          <th className="border py-2 px-4">Image</th>
          <th className="border py-2 px-4">Name</th>
          <th className="border py-2 px-4">Address</th>
          <th className="border py-2 px-4">Email</th>
          <th className="border py-2 px-4">Initiation</th>
          <th className="border py-2 px-4">Edit</th>
          <th className="border py-2 px-4">Delete</th>
        </tr>

        {Users.map((user) => {
          return (
            <tr>
              <td className="border py-2 px-4">{user.id}</td>
              <td className="border py-2 px-4">
                <img className="h-[50px]" src={`${user.Image}`} alt="" />
              </td>
              <td className="border py-2 px-4">{user.Name}</td>
              <td className="border py-2 px-4">{user.Address}</td>
              <td className="border py-2 px-4">{user.Email}</td>
              <td className="border py-2 px-4">{user.Initiation}</td>
              <td className="border py-2 px-4">
                <button
                  onClick={() => {
                    setEditID(user.id);
                    setEdit(true);
                  }}
                >
                  Edit
                </button>
              </td>
              <td className="border py-2 px-4">
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>

      {EditUser ? <EditUserForm id={EditUserID} /> : null}
    </div>
  );
};

const EditUserForm = ({ id }) => {
  // Form Data State
  const [data, setData] = useState({
    Fname: "",
    MName: "",
    Lname: "",
    Image: "",
    Flate: "",
    Area: "",
    State: "",
    City: "",
    Pin: "",
    Email: "",
    Initiation: "",
  });

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    const token = Cookies.get("Admin");
    const Data = await axios.get(
      `http://localhost:3001/admin/getUserDetails/${id}`,
      { headers: { token: token } }
    );
    const Name = Data.data[0].Name.split(" ");
    const Address = Data.data[0].Address.split(",");

    setData({
      Fname: Name[0],
      MName: Name[1],
      Lname: Name[2],
      Image: Data.data[0].Image,
      Flate: Address[0],
      Area: Address[1],
      State: Address[3],
      City: Address[2],
      Pin: Address[4],
      Email: Data.data[0].Email,
      Initiation: Data.data[0].Initiation,
    });
  };

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
    const res = await axios.post(
      `http://localhost:3001/admin/updateUser/${id}`,
      data,
      {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      alert("User Updated !");
      window.location.reload(false);
    } else {
      alert(res.data);
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-60 flex items-center justify-center">
      <form
        className="border rounded-lg m-auto bg-white  w-max p-10"
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
            value={data.Fname}
          />
          <input
            required
            onChange={HandleChange}
            className="border p-1 rounded-md w-1/3"
            type="text"
            placeholder="Middle Name"
            name="MName"
            value={data.MName}
          />
          <input
            required
            onChange={HandleChange}
            className="border p-1 rounded-md w-1/3"
            type="text"
            placeholder="Last Name"
            name="Lname"
            value={data.Lname}
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
            value={data.Flate}
          />
          <input
            required
            onChange={HandleChange}
            className="border p-1 rounded-md w-1/3"
            type="text"
            placeholder="Area"
            name="Area"
            value={data.Area}
          />
          <input
            required
            onChange={HandleChange}
            className="border p-1 rounded-md w-1/3"
            type="text"
            placeholder="State"
            name="State"
            value={data.State}
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
            value={data.City}
          />
          <input
            required
            //   pattern="/^[0-9]{6}/"
            onChange={HandleChange}
            className="border p-1 rounded-md w-1/2"
            type="number"
            placeholder="Pin code"
            name="Pin"
            value={data.Pin}
          />
        </div>

        <input
          required
          onChange={HandleChange}
          className="border p-1 rounded-md w-full mt-3"
          type="email"
          placeholder="Email"
          name="Email"
          value={data.Email}
        />

        <input
          required
          onChange={HandleChange}
          className="border p-1 rounded-md w-full mt-3"
          type="date"
          placeholder="Initiation"
          name="Initiation"
          value={data.Initiation}
        />

        <button
          type="submit"
          // onClick={(e) => HandleClick(e)}
          className="w-full py-1 text-center text-white bg-orange-600 font-semibold rounded-md mt-3"
        >
          Save
        </button>
      </form>
    </div>
  );
};
