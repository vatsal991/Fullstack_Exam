const express = require("express");
const AuthRoute = express.Router();

// Importing controllers
const AdminLogin = require("../Controller/AdminLogin");
const DevoteeLogin = require("../Controller/DevoteeLogin");
const VerifyOTP = require("../Controller/VerifyOTP");

// Defining routes
AuthRoute.post("/adminLogin", AdminLogin);
AuthRoute.post("/devoteeLogin", DevoteeLogin);
AuthRoute.post("/verifyOTP", VerifyOTP);

module.exports = AuthRoute;
