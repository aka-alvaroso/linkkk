const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userAuthenticate = require("../middlewares/userAuthenticate");
const router = express.Router();

const {
  createLink,
  getLinkDetails,
  getLinksByUserId,
  getLinkStats,
  updateLink,
  deleteLink,
} = require("../controllers/link");

router.post("/create", authenticate, createLink);
router.get("/user", authenticate, getLinksByUserId);
router.get("/:shortCode", authenticate, userAuthenticate, getLinkDetails);
router.get("/stats/:shortCode", authenticate, userAuthenticate, getLinkStats);
router.put("/:id", authenticate, userAuthenticate, updateLink);
router.delete("/:id", authenticate, deleteLink);

module.exports = router;
