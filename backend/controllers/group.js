const prisma = require("../prisma/client");

const createGroup = async (req, res) => {
  const { title, description, color } = req.body;
  const userId = req.user.id;

  if (!userId || !title) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const group = await prisma.group.create({
    data: {
      userId: Number(userId),
      title: title,
      description: description,
      color: color,
    },
  });

  res.status(201).json(group);
};

const getGroupsByUserId = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId parameter" });
  }

  const groups = await prisma.group.findMany({
    where: { userId: Number(userId) },
  });

  if (!groups) {
    return res.status(404).json({ error: "Groups not found" });
  }

  res.status(200).json(groups);
};

const updateGroup = async (req, res) => {
  const { groupId, title, description, color } = req.body;
  const userId = req.user.id;

  if (!groupId || !title) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const group = await prisma.group.update({
    where: {
      id: Number(groupId),
      userId: Number(userId),
    },
    data: {
      title: title,
      description: description,
      color: color,
    },
  });

  res.status(200).json(group);
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.body;
  const userId = req.user.id;

  if (!groupId) {
    return res.status(400).json({ error: "Falta el parámetro groupId" });
  }

  const group = await prisma.group.delete({
    where: {
      id: Number(groupId),
      userId: Number(userId),
    },
  });

  res.status(200).json({ message: "Grupo eliminado correctamente", group });
};

module.exports = {
  createGroup,
  getGroupsByUserId,
  updateGroup,
  deleteGroup,
};
