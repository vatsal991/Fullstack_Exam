const jwt = require("jsonwebtoken");
const prisma = require("../Database/PrismaClient");
require("dotenv").config();

const Donation = async (req, res) => {
  const Data = jwt.verify(req.headers.token, process.env.KEY);
  const { amount, month, year } = req.body;

  try {
    const Store = await prisma.donamtion.create({
      data: {
        Email: Data.Email,
        Amount: amount,
        Month: month,
        Year: year,
      },
    });
    res.status(200).send("Donation addes");
  } catch (error) {
    res.status(400).send("Something went wrong !");
  }
};

module.exports = Donation;
