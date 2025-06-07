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
const publicRoutes = require("./routes/public");
const cookieParser = require("cookie-parser");
const validate = require("./middlewares/validate");
const {
  shortCodeParamSchema,
  postLinkPassword,
} = require("./validations/link");
const rateLimit = require("express-rate-limit");
const webhookRoutes = require("./routes/webhook");

const stripeRoutes = require("./routes/stripe");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["https://linkkk.dev", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
// Middleware para la ruta de webhooks de Stripe (debe ir antes de express.json())
app.use("/stripe-webhook", webhookRoutes);
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
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 100, // Limit each IP to 100 requests per day
  message:
    "Demasiadas solicitudes desde esta IP, por favor, inténtalo de nuevo después de 24 horas",
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
app.use("/stripe", stripeRoutes);

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
