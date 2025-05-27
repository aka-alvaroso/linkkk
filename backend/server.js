const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const linkRoutes = require("./routes/link");
const linkController = require("./controllers/link");
const accessRoutes = require("./routes/access");
const groupRoutes = require("./routes/group");
const tagRoutes = require("./routes/tag");
const qrCodeRoutes = require("./routes/qrcode");
const cookieParser = require("cookie-parser");
const validate = require("./middlewares/validate");
const {
  shortCodeParamSchema,
  postLinkPassword,
} = require("./validations/link");

const prisma = require("./prisma/client");

const stripeRoutes = require("./routes/stripe");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/assets/font",
  express.static("/var/www/linkkk/frontend/src/assets/font")
);
app.use(
  "/public/images",
  express.static("/var/www/linkkk/frontend/public/images")
);

// Rutas
app.get("/", (req, res) => {
  res.send("API de URL Shortener funcionando");
});

// Rutas de la API

// app.route(
//   "/r/:shortCode",
//   validate(shortCodeParamSchema),
//   linkController.getLinkRedirect
// );

app
  .route("/r/:shortCode")
  .get(validate(shortCodeParamSchema), linkController.getLinkRedirect)
  .post(validate(postLinkPassword), linkController.postLinkPassword);

app.use("/link", linkRoutes);
app.use("/access", accessRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/group", groupRoutes);
app.use("/tag", tagRoutes);
app.use("/qrcode", qrCodeRoutes);
app.use("/stripe", stripeRoutes);

app.get(
  "/:shortCode",
  validate(shortCodeParamSchema),
  linkController.getLinkRedirect
);

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
