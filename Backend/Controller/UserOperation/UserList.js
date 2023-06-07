const prisma = require("../../Database/PrismaClient");

const UserList = async (req, res) => {
  try {
    const Data = await prisma.users.findMany({
      select: {
        Image: true,
        Address: true,
        Email: true,
        id: true,
        Name: true,
        Initiation: true,
      },
    });
    res.send(Data);
  } catch (error) {
    res.send(error);
  }
};

module.exports = UserList;
