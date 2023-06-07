const express = require("express");
const AuthRoute = require("./Router/Auth");
const cors = require("cors");
const AdminRoute = require("./Router/Admin");
const DevoteeRoute = require("./Router/Devotee");
const app = express();

// Using middlewares
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/auth", AuthRoute);
app.use("/admin", AdminRoute);
app.use("/devotee", DevoteeRoute);

app.listen(3001, (e) => {
  if (!e) console.log("backend is running on port 3001");
});
