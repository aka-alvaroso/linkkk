const prisma = require("../prisma/client");

// Crear un link
const createLink = async (req, res) => {
  try {
    const {
      userId,
      url,
      groupId,
      tags,
      sufix,
      password,
      accessLimit,
      blockedCountries,
      mobileUrl,
      desktopUrl,
      expirationDate,
      metadata,
    } = req.body;

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
        groupId: groupId ? Number(groupId) : null,
        sufix: sufix ? sufix : null,
        password: password ? password : null,
        accessLimit: accessLimit ? Number(accessLimit) : null,
        blockedCountries: {
          connect: blockedCountries?.map((countryId) => ({
            id: Number(countryId),
          })),
        },
        mobileUrl: mobileUrl ? mobileUrl : null,
        desktopUrl: desktopUrl ? desktopUrl : null,
        d_expire: expirationDate ? new Date(expirationDate) : null,
      },
    });

    // If tags are provided, connect them to the link
    if (tags && tags.length > 0) {
      await prisma.link.update({
        where: { id: link.id },
        data: {
          tags: {
            connect: tags.map((tagId) => ({ id: Number(tagId) })),
          },
        },
      });
    }

    res.status(201).json(link);
  } catch (error) {
    console.error("Error al crear link:", error);
    res
      .status(500)
      .json({ error: "Error al crear link", details: error.message });
  }
};

// Obtener un link por ID
const getLinkByShortCode = async (req, res) => {
  try {
    const { shortCode } = req.params;

    if (!shortCode) {
      return res.status(400).json({ error: "Falta el parámetro shortCode" });
    }

    const link = await prisma.link.findFirst({
      where: {
        OR: [{ shortUrl: shortCode }, { sufix: shortCode }],
      },
      include: {
        accesses: true,
        group: true,
        tags: true,
        blockedCountries: true,
        metadata: true,
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
        group: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
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

// Estadísticas de un link
const getLinkStats = async (req, res) => {
  try {
    const { shortCode } = req.params;

    if (!shortCode) {
      return res.status(400).json({ error: "Falta el parámetro id" });
    }

    // 1. Obtener el link
    const link = await prisma.link.findFirst({
      where: {
        OR: [{ shortUrl: shortCode }, { sufix: shortCode }],
      },
      include: {
        accesses: true,
      },
    });

    // 2. Obtener los accesos
    const accesses = await prisma.access.findMany({
      where: { linkId: Number(link.id) },
    });

    // 3. Calcular los accesos al enlace totales
    const totalAccesses = accesses.length;

    // 4. Calcular los accesos al enlace de los últimos 7 días (Incluir el día actual)
    const today = new Date();
    const last7Days = [];

    // Nombres de los días en español
    const dayNames = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    // Crear array con los últimos 7 días (incluyendo hoy)
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // Inicializar cada día con 0 clics
      const dayName = i === 0 ? "Hoy" : dayNames[date.getDay()];

      last7Days.push({
        day: dayName,
        date: new Date(date.setHours(0, 0, 0, 0)), // Normalizar a inicio del día
        clics: 0,
      });
    }

    // Contar los accesos para cada día
    accesses.forEach((access) => {
      const accessDate = new Date(access.date);
      accessDate.setHours(0, 0, 0, 0); // Normalizar a inicio del día

      // Verificar si el acceso está dentro de los últimos 7 días
      for (let i = 0; i < last7Days.length; i++) {
        if (accessDate.getTime() === last7Days[i].date.getTime()) {
          last7Days[i].clics++;
          break;
        }
      }
    });

    // Eliminar la propiedad date que usamos para comparar (no la necesitamos en la respuesta)
    const last7DaysFormatted = last7Days.map(({ day, clics }) => ({
      day,
      clics,
    }));

    // 5. Calcular el porcentaje de tipos de dispositivos (Mobile y Desktop)
    const mobileAccesses = accesses.filter(
      (access) => access.device?.type === "MOBILE" || access.device === "MOBILE"
    ).length;

    // 6. Calcular el número de accesos a través de QR
    const qrAccesses = accesses.filter(
      (access) => access.method?.type === "QR" || access.method === "QR"
    ).length;

    // Devolver estadisticas
    res.status(200).json({
      totalAccesses,
      last7Days: last7DaysFormatted,
      mobileAccesses,
      desktopAccesses: totalAccesses - mobileAccesses,
      qrAccesses,
      linkAccesses: totalAccesses - qrAccesses,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};

// Actualizar un link
const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro id" });
    }

    // Verificar si el link existe
    const existingLink = await prisma.link.findUnique({
      where: { id: Number(id) },
    });

    if (!existingLink) {
      return res.status(404).json({ error: "Link no encontrado" });
    }

    // Actualizar el link
    const updatedLink = await prisma.link.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        group: true,
        tags: true,
      },
    });

    res.status(200).json(updatedLink);
  } catch (error) {
    console.error("Error al actualizar link:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar link", details: error.message });
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
  getLinkStats,
  updateLink,
  deleteLink,
};
