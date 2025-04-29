import { body } from "express-validator";

export const createLinkValidators = [
  body("url").isURL().withMessage("URL inválida"),
  body("groupId")
    .optional()
    .isNumeric()
    .withMessage("groupId debe ser numérico"),
  body("tags").optional().isArray().withMessage("tags debe ser un array"),
  body("expirationDate").optional().isISO8601().withMessage("Fecha inválida"),
];
