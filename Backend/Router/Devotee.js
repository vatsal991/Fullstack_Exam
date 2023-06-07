const express = require("express");
const DevoteeRoute = express.Router();

// Importing controllers
const Donation = require("../Controller/Donation");
const VerifyDevotee = require("../Middleware/VerifyDevotee");

// Defining routes
DevoteeRoute.use(VerifyDevotee);
DevoteeRoute.post("/donation", Donation);

module.exports = DevoteeRoute;
