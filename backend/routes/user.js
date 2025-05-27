const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const userAuthenticate = require("../middlewares/userAuthenticate");

const { getUserById, updateUser, deleteUser } = require("../controllers/user");

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/update-plan", authenticate, userAuthenticate, updateUser);

module.exports = router;
