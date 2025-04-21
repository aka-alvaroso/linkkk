const prisma = require("../prisma/client");

const createGroup = async (req, res) => {
  const { userId, title, description, color } = req.body;

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
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Falta el parámetro userId" });
  }

  const groups = await prisma.group.findMany({
    where: { userId: Number(userId) },
  });

  if (!groups) {
    return res.status(404).json({ error: "Grupos no encontrados" });
  }

  res.status(200).json(groups);
};

const updateGroup = async (req, res) => {
  const { groupId, title, description, color } = req.body;

  if (!groupId || !title) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const group = await prisma.group.update({
    where: { id: Number(groupId) },
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

  if (!groupId) {
    return res.status(400).json({ error: "Falta el parámetro groupId" });
  }

  const group = await prisma.group.delete({
    where: { id: Number(groupId) },
  });

  res.status(200).json({ message: "Grupo eliminado correctamente", group });
};

module.exports = {
  createGroup,
  getGroupsByUserId,
  updateGroup,
  deleteGroup,
};
