const prisma = require("../prisma/client");
const jwt = require("jsonwebtoken");

const createLink = async (req, res) => {
  if (req.guest?.guestSessionId) {
    await prisma.link.deleteMany({
      where: {
        guest_sessionId: req.guest.guestSessionId,
        d_expire: { lt: new Date() },
      },
    });

    const count = await prisma.link.count({
      where: {
        guest_sessionId: req.guest.guestSessionId,
      },
    });

    if (count >= 10) {
      return res.status(400).json({ error: "Límite de enlaces alcanzado" });
    }
  }

  try {
    const {
      longUrl,
      groupId,
      tags,
      sufix,
      password,
      accessLimit,
      blockedCountries,
      mobileUrl,
      desktopUrl,
      expirationDate,
      metadataTitle,
      metadataDescription,
      metadataImage,
      useMetadata,
    } = req.body;

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomString = Array(10)
      .fill(null)
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join("");

    if (sufix) {
      const linkExists = await prisma.link.findUnique({
        where: { sufix: sufix },
      });

      if (linkExists) {
        return res.status(400).json({ error: "Sufix already exists" });
      }
    }

    const isGuest = !!req.guest;

    const link = await prisma.link.create({
      data: {
        userId: !isGuest ? Number(req.user?.id) : null,
        guest_sessionId: isGuest ? Number(req.guest?.guestSessionId) : null,
        longUrl,
        shortUrl: randomString,
        groupId: isGuest ? null : groupId ? Number(groupId) : null,
        sufix: isGuest ? null : sufix ? sufix : null,
        password: isGuest ? null : password ? password : null,
        accessLimit: isGuest ? null : accessLimit ? Number(accessLimit) : null,
        blockedCountries: {
          connect: !isGuest
            ? blockedCountries?.map((countryId) => ({ id: Number(countryId) }))
            : [],
        },
        tags: {
          connect: !isGuest
            ? tags?.map((tagId) => ({ id: Number(tagId) }))
            : [],
        },
        mobileUrl: isGuest ? null : mobileUrl ? mobileUrl : null,
        desktopUrl: isGuest ? null : desktopUrl ? desktopUrl : null,
        d_expire: isGuest
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          : expirationDate
          ? new Date(expirationDate)
          : null,
        metadataTitle: useMetadata ? metadataTitle : null,
        metadataDescription: useMetadata ? metadataDescription : null,
        metadataImage: useMetadata ? metadataImage : null,
        useCustomMetadata: useMetadata,
      },
    });

    res.status(201).json(link);
  } catch (error) {
    console.error("Error al crear link:", error);
    res
      .status(500)
      .json({ error: "Error al crear link", details: error.message });
  }
};

const getLinkRedirect = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const userAgent = req.headers["user-agent"];
    const isBot = /bot|facebook|twitter|discord|crawl|spider|preview/i.test(
      userAgent
    );

    if (!shortCode) {
      return res.status(400).json({ error: "Missing shortCode parameter" });
    }

    let link = await prisma.link.findUnique({
      where: { sufix: shortCode },
      include: { blockedCountries: true, accesses: true },
    });
    if (!link)
      link = await prisma.link.findUnique({
        where: { shortUrl: shortCode },
        include: { blockedCountries: true, accesses: true },
      });

    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    if (isBot) {
      // Usar metadatos personalizados si existen y están habilitados
      const title = link.useCustomMetadata && link.metadataTitle
        ? link.metadataTitle
        : "Título por defecto";
      const description = link.useCustomMetadata && link.metadataDescription
        ? link.metadataDescription
        : "Descripción por defecto";
      const image = link.useCustomMetadata && link.metadataImage
        ? link.metadataImage
        : "https://tusitio.com/default.jpg";

      return res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:url" content="https://linkkk.dev/${shortCode}" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${image}" />
          <meta http-equiv="refresh" content="0;url=https://linkkk.dev/r/${shortCode}" />
          <title>${title || "Redireccionando..."}</title>
        </head>
        <body>
          <p>Redirigiendo...</p>
        </body>
        </html>`);
    } else {
      res.status(200).json(link);
    }
  } catch (error) {
    console.error("Error al recuperar link:", error);
    res.status(500).json({ error: error.message });
  }
};

const getLinkDetails = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: "No token provided - Link details" });
    }

    const { shortCode } = req.params;

    if (!shortCode) {
      return res.status(400).json({ error: "Missing shortCode parameter" });
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
      },
    });

    if (!link || link.userId !== req.user.id) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLinksByUserId = async (req, res) => {
  try {
    const userId = req.user?.id;
    const guestId = req.guest?.guestSessionId;

    const links = await prisma.link.findMany({
      where: userId
        ? { userId: Number(userId) }
        : guestId
        ? { guest_sessionId: Number(guestId) }
        : {},
      include: {
        group: true,
        tags: true,
        blockedCountries: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (links.length === 0) {
      return res.status(200).json({ links: [] });
    }

    res.status(200).json({ links });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TODO: Optimización y claridad del código al recuperar stats
const getLinkStats = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "No token provided - Link stats" });
    }

    const { shortCode } = req.params;

    if (!shortCode) {
      return res.status(400).json({ error: "Missing shortCode parameter" });
    }

    // Obtener el enlace con accesos
    const link = await prisma.link.findFirst({
      where: {
        OR: [{ shortUrl: shortCode }, { sufix: shortCode }],
      },
      include: {
        accesses: true,
      },
    });

    if (!link || link.userId !== req.user.id) {
      return res.status(404).json({ error: "Link not found" });
    }

    const accesses = link.accesses;

    const totalAccesses = accesses.length;

    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return {
        date: date.setHours(0, 0, 0, 0),
        day:
          i === 0
            ? "Hoy"
            : [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
              ][date.getDay()],
        clics: 0,
      };
    });

    const accessMap = accesses.reduce((acc, access) => {
      const accessDate = new Date(access.date).setHours(0, 0, 0, 0);
      const day = last7Days.find((d) => d.date === accessDate);
      if (day) {
        day.clics += 1;
      }
      return acc;
    }, {});

    const last7DaysFormatted = last7Days.map(({ day, clics }) => ({
      day,
      clics,
    }));

    const mobileAccesses = accesses.filter(
      (access) => access.device?.type === "MOBILE"
    ).length;
    const qrAccesses = accesses.filter(
      (access) => access.method?.type === "QR"
    ).length;

    res.status(200).json({
      totalAccesses,
      last7Days: last7DaysFormatted,
      mobileAccesses,
      desktopAccesses: totalAccesses - mobileAccesses,
      qrAccesses,
      linkAccesses: totalAccesses - qrAccesses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// TODO: Optimización y claridad del código al actualizar un link
const updateLink = async (req, res) => {
  try {
    const {
      id,
      longUrl,
      status,
      groupId,
      tags,
      d_expire,
      password,
      accessLimit,
      blockedCountries,
      mobileUrl,
      desktopUrl,
      sufix,
      metadataTitle,
      metadataDescription,
      metadataImage,
      useMetadata,
    } = req.body;

    const existingLink = await prisma.link.findUnique({
      where: { id: Number(id) },
    });

    if (!existingLink || existingLink.userId !== req.user.id) {
      return res.status(404).json({ error: "Link no encontrado" });
    }

    const updatedLink = await prisma.link.update({
      where: { id: Number(id) },
      data: {
        longUrl,
        status,
        groupId: groupId === "0" ? null : Number(groupId),
        tags: {
          set: [],
          connect: tags && tags.map((tagId) => ({ id: Number(tagId) })),
        },
        d_expire: d_expire ? new Date(d_expire) : null,
        password: password ? password : null,
        accessLimit: accessLimit ? Number(accessLimit) : null,
        blockedCountries: {
          set: [],
          connect: blockedCountries?.map((countryId) => ({
            id: Number(countryId),
          })),
        },
        tags: {
          set: [],
          connect: tags?.map((tagId) => ({ id: Number(tagId) })),
        },
        mobileUrl: mobileUrl ? mobileUrl : null,
        desktopUrl: desktopUrl ? desktopUrl : null,
        sufix: sufix ? sufix : null,
        metadataTitle: useMetadata ? metadataTitle : null,
        metadataDescription: useMetadata ? metadataDescription : null,
        metadataImage: useMetadata ? metadataImage : null,
        useCustomMetadata: useMetadata,
      },
      include: {
        group: true,
        tags: true,
        accesses: true,
      },
    });

    res.status(200).json(updatedLink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLink = async (req, res) => {
  const userId = req.user?.id;
  const guestId = req.guest?.guestSessionId;

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro id" });
    }

    const link = await prisma.link.delete({
      where: {
        id: Number(id),
        userId: userId ? Number(userId) : null,
        guest_sessionId: guestId ? Number(guestId) : null,
      },
    });

    res.status(200).json({ message: "Link deleted successfully", link });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLink,
  getLinkRedirect,
  getLinkDetails,
  getLinksByUserId,
  getLinkStats,
  updateLink,
  deleteLink,
};
