const express = require("express");
const router = express.Router();

const {
  createLink,
  getLinkByShortCode,
  getLinksByUserId,
  getLinkStats,
  updateLink,
  deleteLink,
} = require("../controllers/link");

router.post("/create", createLink);
router.get("/:shortCode", getLinkByShortCode);
router.get("/user/:userId", getLinksByUserId);
router.get("/stats/:shortCode", getLinkStats);
router.put("/:id", updateLink);
router.delete("/:id", deleteLink);

module.exports = router;
