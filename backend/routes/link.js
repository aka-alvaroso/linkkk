const express = require("express");
const router = express.Router();

const {
  createLink,
  getLinkByShortCode,
  getLinksByUserId,
  updateLink,
  deleteLink,
} = require("../controllers/link");

router.post("/create", createLink);
router.get("/:shortCode", getLinkByShortCode);
router.get("/user/:userId", getLinksByUserId);
router.put("/:id", updateLink);
router.delete("/:id", deleteLink);

module.exports = router;
