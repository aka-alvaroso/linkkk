const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const userAuthenticate = require("../middlewares/userAuthenticate");
const validate = require("../middlewares/validate");
const { updateUserPlanSchema } = require("../validations/user");

const {
  getUserById,
  updateUser,
  updateUserPlan,
  deleteUser,
} = require("../controllers/user");

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post(
  "/update-plan",
  authenticate,
  userAuthenticate,
  validate(updateUserPlanSchema),
  updateUserPlan
);

module.exports = router;
