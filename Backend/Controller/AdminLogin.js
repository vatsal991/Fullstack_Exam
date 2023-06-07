const prisma = require("../Database/PrismaClient");
const jwt = require("jsonwebtoken");
const sendMail = require("./SendMail");
require("dotenv").config();

const AdminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const Data = await prisma.admin.findUnique({
      where: { username: username },
    });
    if (Data != null && password === Data.password) {
      const token = jwt.sign(Data, process.env.ADMINKEY, { expiresIn: "6h" });
      res.status(200).json({ token });
    } else res.status(2001).send("invalid credentials");
  } catch (error) {
    res.status(202).send("Something went wrong !");
  }
};

module.exports = AdminLogin;
