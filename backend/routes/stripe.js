const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/stripe");
const authenticate = require("../middlewares/authenticate");
const userAuthenticate = require("../middlewares/userAuthenticate");

router.post(
  "/create-payment-intent",
  authenticate,
  userAuthenticate,
  createPaymentIntent
);

module.exports = router;
