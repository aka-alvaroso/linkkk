const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const linkRoutes = require("./routes/link");
const linkController = require("./controllers/link");
const accessRoutes = require("./routes/access");
const groupRoutes = require("./routes/group");
const tagRoutes = require("./routes/tag");
const qrCodeRoutes = require("./routes/qrcode");
const publicRoutes = require("./routes/public");
const cookieParser = require("cookie-parser");
const validate = require("./middlewares/validate");
const {
  shortCodeParamSchema,
  postLinkPassword,
} = require("./validations/link");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["https://linkkk.dev", "http://localhost:5173"],
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

const publicApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50, // Limita cada IP a 50 solicitudes por windowMs
  message:
    "Demasiadas solicitudes desde esta IP, por favor, inténtalo de nuevo después de 15 minutos",
  standardHeaders: true, // Devuelve información de límite de velocidad en los encabezados `RateLimit-*`
  legacyHeaders: false, // Deshabilita los encabezados `X-RateLimit-*`
});

// Rutas
app.get("/status", (req, res) => {
  res.send("API de URL Shortener funcionando");
});
app.use("/link", linkRoutes);
app.use("/access", accessRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/group", groupRoutes);
app.use("/tag", tagRoutes);
app.use("/qrcode", qrCodeRoutes);
app
  .route("/r/:shortCode")
  .get(validate(shortCodeParamSchema), linkController.getLinkRedirect)
  .post(validate(postLinkPassword), linkController.postLinkPassword);
app.get(
  "/:shortCode",
  validate(shortCodeParamSchema),
  linkController.getLinkRedirect
);

app.use("/public", publicApiLimiter);
app.use("/public", publicRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
