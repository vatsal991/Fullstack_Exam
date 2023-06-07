const prisma = require("../../Database/PrismaClient");

const UpdateUser = async (req, res) => {
  const { id } = req.params;
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

  console.log(
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
    Image
  );
  try {
    const Data = await prisma.users.update({
      where: { id: Number(id) },
      data: {
        Image: Image,
        Address: Flate + "," + Area + "," + City + "," + State + "," + Pin,
        Name: Fname + " " + MName + " " + Lname,
        Initiation: Initiation,
        Email: Email,
        password: Math.floor(Math.random() * 1000000).toString(),
      },
    });
    res.send(Data);
  } catch (error) {
    res.send(error);
  }
};

module.exports = UpdateUser;
