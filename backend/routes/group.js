const express = require("express");
const router = express.Router();

const groupController = require("../controllers/group");

router.post("/create", groupController.createGroup);
router.get("/user/:userId", groupController.getGroupsByUserId);
router.put("/update", groupController.updateGroup);
router.delete("/delete", groupController.deleteGroup);

module.exports = router;
