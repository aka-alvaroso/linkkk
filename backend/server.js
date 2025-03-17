const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const linkRoutes = require("./routes/link");
const accessRoutes = require("./routes/access");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
  res.send("API de URL Shortener funcionando");
});

// Rutas de la API
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/link", linkRoutes);
app.use("/access", accessRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
