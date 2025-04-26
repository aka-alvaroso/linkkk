const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const userAuthenticate = require("../middlewares/userAuthenticate");

const tagController = require("../controllers/tag");

router.post("/create", authenticate, userAuthenticate, tagController.createTag);
router.put("/update", authenticate, userAuthenticate, tagController.updateTag);
router.delete(
  "/delete",
  authenticate,
  userAuthenticate,
  tagController.deleteTag
);
router.get(
  "/user",
  authenticate,
  userAuthenticate,
  tagController.getTagsByUserId
);

module.exports = router;
