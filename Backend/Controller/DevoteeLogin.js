const prisma = require("../Database/PrismaClient");
const jwt = require("jsonwebtoken");
const sendMail = require("./SendMail");
require("dotenv").config();

const DevoteeLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Data = await prisma.users.findFirst({
      where: { Email: email },
    });
    if (Data != null && password === Data.password) {
      const OTP = Math.floor(Math.random() * 1000).toString();
      const Data = await prisma.oTP.findUnique({ where: { Email: email } });
      if (Data != null) {
        await prisma.oTP.update({
          where: { Email: email },
          data: { OTP: OTP },
        });
      } else {
        await prisma.oTP.create({
          data: { Email: email, OTP: OTP },
        });
      }
      const Body = `Your OTP For Email : ${email} is ${OTP}`;
      sendMail(Body, email);
      res.status(200).send("Email sent !");
    } else res.status(201).send("invalid credentials");
  } catch (error) {
    res.status(202).send("Something went wrong !");
  }
};

module.exports = DevoteeLogin;
