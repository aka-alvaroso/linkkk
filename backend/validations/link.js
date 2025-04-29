const z = require("zod");

const createLinkSchema = z.object({
  url: z.string().url("URL no válida"),
  groupId: z.number().optional(),
  tags: z.array(z.number()).optional(),
  expirationDate: z.string().optional(),
  password: z.string().optional(),
  accessLimit: z.number().optional(),
  blockedCountries: z.array(z.string()).optional(),
  mobileUrl: z.string().optional(),
  desktopUrl: z.string().optional(),
  sufix: z.string().optional(),
});

const shortCodeParamSchema = z.object({
  shortCode: z.string().min(1, "shortCode requerido"),
});

const updateLinkSchema = z.object({
  id: z.string().min(1, "ID requerido"), // desde req.params
  longUrl: z.string().url().optional(),
  status: z.boolean().optional(),
  groupId: z.string().optional(),
  tags: z.array(z.number()).optional(),
  d_expire: z.string().optional(), // ISO date
  password: z.string().optional(),
  accessLimit: z.number().optional(),
  blockedCountries: z.array(z.number()).optional(),
  mobileUrl: z.string().url().optional(),
  desktopUrl: z.string().url().optional(),
  sufix: z.string().optional(),
});

const deleteLinkSchema = z.object({
  id: z.number().int().positive({ message: "ID inválido" }),
});

module.exports = {
  createLinkSchema,
  shortCodeParamSchema,
  updateLinkSchema,
  deleteLinkSchema,
};
