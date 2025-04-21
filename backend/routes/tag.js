const express = require("express");
const router = express.Router();

const tagController = require("../controllers/tag");

router.post("/create", tagController.createTag);
router.put("/update", tagController.updateTag);
router.delete("/delete", tagController.deleteTag);
router.get("/user/:userId", tagController.getTagsByUserId);

module.exports = router;
