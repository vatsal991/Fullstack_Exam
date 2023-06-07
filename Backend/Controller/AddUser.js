const prisma = require("../Database/PrismaClient");
const sendMail = require("../Controller/SendMail");

const AddUser = async (req, res) => {
  const {
    Fname,
    MName,
    Lname,
    State,
    Area,
    Flate,
    City,
    Pin,
    Email,
    Initiation,
    Image,
  } = req.body;

  try {
    const FindeUser = await prisma.users.findFirst({ where: { Email: Email } });
    if (FindeUser != null) {
      res.status(202).send("Email Alredy exist");
    } else {
      const Data = await prisma.users.create({
        data: {
          Image: Image,
          Address: Flate + "," + Area + "," + City + "," + State + "," + Pin,
          Name: Fname + " " + MName + " " + Lname,
          Initiation: Initiation,
          Email: Email,
          password: Math.floor(Math.random() * 1000000).toString(),
        },
      });

      const Body = `Hi, Your Login Credentials are Email : ${Data.Email} And Password ${Data.password}`;
      sendMail(Body, Data.Email);
      res.status(200).send("User Created");
    }
  } catch (error) {
    res.status(201).send("something went wrong !");
  }
};

module.exports = AddUser;
