const prisma = require("../prisma/client");

const createTag = async (req, res) => {
  const { userId, tagName, color } = req.body;

  const tag = await prisma.tag.create({
    data: {
      userId: Number(userId),
      name: tagName,
      color: color,
    },
  });

  res.status(201).json(tag);
};

const getTagsByUserId = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "Falta el parámetro userId" });
  }

  const tags = await prisma.tag.findMany({
    where: { userId: Number(userId) },
  });

  if (!tags) {
    return res.status(404).json({ error: "Tags no encontrados" });
  }

  res.status(200).json(tags);
};

const updateTag = async (req, res) => {
  const { tagId, name, color } = req.body;

  if (!tagId || !name) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const tag = await prisma.tag.update({
    where: { id: Number(tagId) },
    data: { name: name, color: color },
  });

  res.status(200).json(tag);
};

const deleteTag = async (req, res) => {
  const { tagId } = req.body;

  if (!tagId) {
    return res.status(400).json({ error: "Falta el parámetro tagId" });
  }

  await prisma.tag.delete({ where: { id: Number(tagId) } });

  res.status(200).json({ message: "Tag eliminado" });
};

module.exports = {
  createTag,
  getTagsByUserId,
  updateTag,
  deleteTag,
};
