const prisma = require("../prisma/client");

// Crear un link
const createLink = async (req, res) => {
  try {
    const { userId, url } = req.body;

    if (!userId || !url) {
      return res.status(400).json({ error: "Faltan parámetros" });
    }

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomString = Array(10)
      .fill(null)
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join("");

    const link = await prisma.link.create({
      data: {
        userId: Number(userId),
        longUrl: url,
        shortUrl: randomString,
      },
    });

    res.status(201).json(link);
  } catch (error) {
    console.error("Error al crear link:", error);
    res.status(500).json({ error: "Error al crear link" });
  }
};

// Obtener un link por ID
const getLinkByShortCode = async (req, res) => {
  try {
    const { shortCode } = req.params;

    if (!shortCode) {
      return res.status(400).json({ error: "Falta el parámetro shortCode" });
    }

    const link = await prisma.link.findUnique({
      where: { shortUrl: shortCode },
      include: {
        accesses: true,
        groups: true,
        tags: true,
      },
    });

    if (!link) {
      return res.status(404).json({ error: "Link no encontrado" });
    }

    res.status(200).json(link);
  } catch (error) {
    console.error("Error al obtener link:", error);
    res.status(500).json({ error: "Error al obtener link" });
  }
};

// Obtener todos los links de un usuario
const getLinksByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Falta el parámetro userId" });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const links = await prisma.link.findMany({
      where: { userId: Number(userId) },
      include: {
        accesses: true,
        groups: true,
        tags: true,
      },
    });

    if (!links) {
      return res.status(404).json({ error: "Links no encontrados" });
    }

    res.status(200).json(links);
  } catch (error) {
    console.error("Error al obtener links:", error);
    res.status(500).json({ error: "Error al obtener links" });
  }
};

// Editar un link
const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { longUrl, shortUrl, password, accessLimit, d_expire } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro id" });
    }

    const link = await prisma.link.update({
      where: { id: Number(id) },
      data: {
        longUrl,
        shortUrl,
        password,
        accessLimit,
        d_expire,
      },
      include: {
        accesses: true,
        groups: true,
        tags: true,
      },
    });

    res.status(200).json(link);
  } catch (error) {
    console.error("Error al actualizar link:", error);
    res.status(500).json({ error: "Error al actualizar link" });
  }
};

// Eliminar un link
const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro id" });
    }

    const link = await prisma.link.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Link eliminado correctamente", link });
  } catch (error) {
    console.error("Error al eliminar link:", error);
    res.status(500).json({ error: "Error al eliminar link" });
  }
};

module.exports = {
  createLink,
  getLinkByShortCode,
  getLinksByUserId,
  updateLink,
  deleteLink,
};
