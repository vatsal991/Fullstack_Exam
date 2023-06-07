const prisma = require("../../Database/PrismaClient");

const UserList = async (req, res) => {
  const { id } = req.params;
  try {
    const Data = await prisma.users.findUnique({
      where: { id: id },
    });
    res.send(Data);
  } catch (error) {
    res.send(error);
  }
};

module.exports = UserList;
