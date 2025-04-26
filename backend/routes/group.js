const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const userAuthenticate = require("../middlewares/userAuthenticate");

const groupController = require("../controllers/group");

router.post(
  "/create",
  authenticate,
  userAuthenticate,
  groupController.createGroup
);
router.get(
  "/user",
  authenticate,
  userAuthenticate,
  groupController.getGroupsByUserId
);
router.put(
  "/update",
  authenticate,
  userAuthenticate,
  groupController.updateGroup
);
router.delete(
  "/delete",
  authenticate,
  userAuthenticate,
  groupController.deleteGroup
);

module.exports = router;
