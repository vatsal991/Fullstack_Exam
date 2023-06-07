const express = require("express");
const AdminRoute = express.Router();
const AddUser = require("../Controller/AddUser");
const VerifyAdmin = require("../Middleware/VerifyAdmin");
const UserList = require("../Controller/UserOperation/UserList");
const UpdateUser = require("../Controller/UserOperation/UpdateUser");

// Defining routes
AdminRoute.use(VerifyAdmin);
AdminRoute.post("/addUser", AddUser);
AdminRoute.get("/userList", UserList);
AdminRoute.get("/getUserDetails/:id", UserList);
AdminRoute.post("/updateUser/:id", UpdateUser);

module.exports = AdminRoute;
