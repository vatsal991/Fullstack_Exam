const prisma = require("../Database/PrismaClient");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const Data = await prisma.oTP.findUnique({
      where: { Email: email },
    });
    if (Data != null && otp === Data.OTP) {
      const token = jwt.sign(Data, process.env.KEY, { expiresIn: "6h" });
      res.status(200).json({ token });
    } else res.status(201).send("invalid otp");
  } catch (error) {
    res.status(202).send("Something went wrong !");
  }
};

module.exports = VerifyOTP;
