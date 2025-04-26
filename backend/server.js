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
const cookieParser = require("cookie-parser");

const prisma = require("./prisma/client");

dotenv.config();

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

// Rutas
app.get("/", (req, res) => {
  res.send("API de URL Shortener funcionando");
});

// Rutas de la API

app.get("/r/:shortCode", linkController.getLinkRedirect);
app.use("/link", linkRoutes);
app.use("/access", accessRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/group", groupRoutes);
app.use("/tag", tagRoutes);
app.get("/countries/insert", (req, res) => {
  const countries = [
    { id: 1, code: "AF", name: "Afganistán" },
    { id: 2, code: "AL", name: "Albania" },
    { id: 3, code: "DZ", name: "Argelia" },
    { id: 4, code: "AS", name: "Samoa Americana" },
    { id: 5, code: "AD", name: "Andorra" },
    { id: 6, code: "AO", name: "Angola" },
    { id: 7, code: "AI", name: "Anguila" },
    { id: 8, code: "AQ", name: "Antártida" },
    { id: 9, code: "AG", name: "Antigua y Barbuda" },
    { id: 10, code: "AR", name: "Argentina" },
    { id: 11, code: "AM", name: "Armenia" },
    { id: 12, code: "AW", name: "Aruba" },
    { id: 13, code: "AU", name: "Australia" },
    { id: 14, code: "AT", name: "Austria" },
    { id: 15, code: "AZ", name: "Azerbaiyán" },
    { id: 16, code: "BS", name: "Bahamas" },
    { id: 17, code: "BH", name: "Bahréin" },
    { id: 18, code: "BD", name: "Bangladesh" },
    { id: 19, code: "BB", name: "Barbados" },
    { id: 20, code: "BY", name: "Bielorrusia" },
    { id: 21, code: "BE", name: "Bélgica" },
    { id: 22, code: "BZ", name: "Belice" },
    { id: 23, code: "BJ", name: "Benín" },
    { id: 24, code: "BM", name: "Bermudas" },
    { id: 25, code: "AX", name: "Islas Åland" },
    { id: 26, code: "BT", name: "Bután" },
    { id: 27, code: "BO", name: "Bolivia" },
    { id: 28, code: "BQ", name: "Bonaire, San Eustaquio y Saba" },
    { id: 29, code: "BA", name: "Bosnia y Herzegovina" },
    { id: 30, code: "BW", name: "Botsuana" },
    { id: 31, code: "BV", name: "Isla Bouvet" },
    { id: 32, code: "BR", name: "Brasil" },
    { id: 33, code: "IO", name: "Territorio Británico del Océano Índico" },
    { id: 34, code: "BN", name: "Brunei" },
    { id: 35, code: "BG", name: "Bulgaria" },
    { id: 36, code: "BF", name: "Burkina Faso" },
    { id: 37, code: "BI", name: "Burundi" },
    { id: 38, code: "CV", name: "Cabo Verde" },
    { id: 39, code: "KH", name: "Camboya" },
    { id: 40, code: "CM", name: "Camerún" },
    { id: 41, code: "CA", name: "Canadá" },
    { id: 42, code: "KY", name: "Islas Caimán" },
    { id: 43, code: "CF", name: "República Centroafricana" },
    { id: 44, code: "TD", name: "Chad" },
    { id: 45, code: "CL", name: "Chile" },
    { id: 46, code: "CN", name: "China" },
    { id: 47, code: "CX", name: "Isla de Navidad" },
    { id: 48, code: "CC", name: "Islas Cocos" },
    { id: 49, code: "CO", name: "Colombia" },
    { id: 50, code: "KM", name: "Comoras" },
    { id: 51, code: "CD", name: "República Democrática del Congo" },
    { id: 52, code: "CG", name: "República del Congo" },
    { id: 53, code: "CK", name: "Islas Cook" },
    { id: 54, code: "CR", name: "Costa Rica" },
    { id: 55, code: "HR", name: "Croacia" },
    { id: 56, code: "CU", name: "Cuba" },
    { id: 57, code: "CW", name: "Curazao" },
    { id: 58, code: "CY", name: "Chipre" },
    { id: 59, code: "CZ", name: "República Checa" },
    { id: 60, code: "CI", name: "Costa de Marfil" },
    { id: 61, code: "DK", name: "Dinamarca" },
    { id: 62, code: "DJ", name: "Djibouti" },
    { id: 63, code: "DM", name: "Dominica" },
    { id: 64, code: "DO", name: "República Dominicana" },
    { id: 65, code: "EC", name: "Ecuador" },
    { id: 66, code: "EG", name: "Egipto" },
    { id: 67, code: "SV", name: "El Salvador" },
    { id: 68, code: "GQ", name: "Guinea Ecuatorial" },
    { id: 69, code: "ER", name: "Eritrea" },
    { id: 70, code: "EE", name: "Estonia" },
    { id: 71, code: "SZ", name: "Suazilandia" },
    { id: 72, code: "ET", name: "Etiopía" },
    { id: 73, code: "FK", name: "Islas Malvinas" },
    { id: 74, code: "FO", name: "Islas Feroe" },
    { id: 75, code: "FJ", name: "Fiyi" },
    { id: 76, code: "FI", name: "Finlandia" },
    { id: 77, code: "FR", name: "Francia" },
    { id: 78, code: "GF", name: "Guayana Francesa" },
    { id: 79, code: "PF", name: "Polinesia Francesa" },
    { id: 80, code: "TF", name: "Territorios Franceses del Sur" },
    { id: 81, code: "GA", name: "Gabón" },
    { id: 82, code: "GM", name: "Gambia" },
    { id: 83, code: "GE", name: "Georgia" },
    { id: 84, code: "DE", name: "Alemania" },
    { id: 85, code: "GH", name: "Ghana" },
    { id: 86, code: "GI", name: "Gibraltar" },
    { id: 87, code: "GR", name: "Grecia" },
    { id: 88, code: "GL", name: "Groenlandia" },
    { id: 89, code: "GD", name: "Granada" },
    { id: 90, code: "GP", name: "Guadalupe" },
    { id: 91, code: "GU", name: "Guam" },
    { id: 92, code: "GT", name: "Guatemala" },
    { id: 93, code: "GG", name: "Guernsey" },
    { id: 94, code: "GN", name: "Guinea" },
    { id: 95, code: "GW", name: "Guinea-Bissau" },
    { id: 96, code: "GY", name: "Guyana" },
    { id: 97, code: "HT", name: "Haití" },
    { id: 98, code: "HM", name: "Islas Heard y McDonald" },
    { id: 99, code: "VA", name: "Santa Sede" },
    { id: 100, code: "HN", name: "Honduras" },
    { id: 101, code: "HK", name: "Hong Kong" },
    { id: 102, code: "HU", name: "Hungría" },
    { id: 103, code: "IS", name: "Islandia" },
    { id: 104, code: "IN", name: "India" },
    { id: 105, code: "ID", name: "Indonesia" },
    { id: 106, code: "IR", name: "Irán" },
    { id: 107, code: "IQ", name: "Iraq" },
    { id: 108, code: "IE", name: "Irlanda" },
    { id: 109, code: "IM", name: "Isla de Man" },
    { id: 110, code: "IL", name: "Israel" },
    { id: 111, code: "IT", name: "Italia" },
    { id: 112, code: "JM", name: "Jamaica" },
    { id: 113, code: "JP", name: "Japón" },
    { id: 114, code: "JE", name: "Jersey" },
    { id: 115, code: "JO", name: "Jordania" },
    { id: 116, code: "KZ", name: "Kazajistán" },
    { id: 117, code: "KE", name: "Kenia" },
    { id: 118, code: "KI", name: "Kiribati" },
    { id: 119, code: "KP", name: "Corea del Norte" },
    { id: 120, code: "KR", name: "Corea del Sur" },
    { id: 121, code: "KW", name: "Kuwait" },
    { id: 122, code: "KG", name: "Kirguistán" },
    { id: 123, code: "LA", name: "Laos" },
    { id: 124, code: "LV", name: "Letonia" },
    { id: 125, code: "LB", name: "Líbano" },
    { id: 126, code: "LS", name: "Lesoto" },
    { id: 127, code: "LR", name: "Liberia" },
    { id: 128, code: "LY", name: "Libia" },
    { id: 129, code: "LI", name: "Liechtenstein" },
    { id: 130, code: "LT", name: "Lituania" },
    { id: 131, code: "LU", name: "Luxemburgo" },
    { id: 132, code: "MO", name: "Macao" },
    { id: 133, code: "MG", name: "Madagascar" },
    { id: 134, code: "MW", name: "Malawi" },
    { id: 135, code: "MY", name: "Malasia" },
    { id: 136, code: "MV", name: "Maldivas" },
    { id: 137, code: "ML", name: "Mali" },
    { id: 138, code: "MT", name: "Malta" },
    { id: 139, code: "MH", name: "Islas Marshall" },
    { id: 140, code: "MQ", name: "Martinica" },
    { id: 141, code: "MR", name: "Mauritania" },
    { id: 142, code: "MU", name: "Mauricio" },
    { id: 143, code: "YT", name: "Mayotte" },
    { id: 144, code: "MX", name: "México" },
    { id: 145, code: "FM", name: "Micronesia" },
    { id: 146, code: "MD", name: "Moldavia" },
    { id: 147, code: "MC", name: "Mónaco" },
    { id: 148, code: "MN", name: "Mongolia" },
    { id: 149, code: "ME", name: "Montenegro" },
    { id: 150, code: "MS", name: "Montserrat" },
    { id: 151, code: "MA", name: "Marruecos" },
    { id: 152, code: "MZ", name: "Mozambique" },
    { id: 153, code: "MM", name: "Myanmar" },
    { id: 154, code: "NA", name: "Namibia" },
    { id: 155, code: "NR", name: "Nauru" },
    { id: 156, code: "NP", name: "Nepal" },
    { id: 157, code: "NL", name: "Países Bajos" },
    { id: 158, code: "NC", name: "Nueva Caledonia" },
    { id: 159, code: "NZ", name: "Nueva Zelanda" },
    { id: 160, code: "NI", name: "Nicaragua" },
    { id: 161, code: "NE", name: "Níger" },
    { id: 162, code: "NG", name: "Nigeria" },
    { id: 163, code: "NU", name: "Niue" },
    { id: 164, code: "NF", name: "Isla Norfolk" },
    { id: 165, code: "MK", name: "Macedonia" },
    { id: 166, code: "MP", name: "Islas Marianas del Norte" },
    { id: 167, code: "NO", name: "Noruega" },
    { id: 168, code: "OM", name: "Omán" },
    { id: 169, code: "PK", name: "Pakistán" },
    { id: 170, code: "PW", name: "Palau" },
    { id: 171, code: "PS", name: "Territorios Palestinos" },
    { id: 172, code: "PA", name: "Panamá" },
    { id: 173, code: "PG", name: "Papúa Nueva Guinea" },
    { id: 174, code: "PY", name: "Paraguay" },
    { id: 175, code: "PE", name: "Perú" },
    { id: 176, code: "PH", name: "Filipinas" },
    { id: 177, code: "PN", name: "Islas Pitcairn" },
    { id: 178, code: "PL", name: "Polonia" },
    { id: 179, code: "PT", name: "Portugal" },
    { id: 180, code: "PR", name: "Puerto Rico" },
    { id: 181, code: "QA", name: "Qatar" },
    { id: 182, code: "RO", name: "Rumania" },
    { id: 183, code: "RU", name: "Rusia" },
    { id: 184, code: "RW", name: "Ruanda" },
    { id: 185, code: "RE", name: "Reunión" },
    { id: 186, code: "BL", name: "San Bartolomé" },
    { id: 187, code: "SH", name: "Santa Elena" },
    { id: 188, code: "KN", name: "San Cristóbal y Nieves" },
    { id: 189, code: "LC", name: "Santa Lucía" },
    { id: 190, code: "MF", name: "San Martín" },
    { id: 191, code: "PM", name: "San Pedro y Miquelón" },
    { id: 192, code: "VC", name: "San Vicente y las Granadinas" },
    { id: 193, code: "WS", name: "Samoa" },
    { id: 194, code: "SM", name: "San Marino" },
    { id: 195, code: "ST", name: "Santo Tomé y Príncipe" },
    { id: 196, code: "SA", name: "Arabia Saudí" },
    { id: 197, code: "SN", name: "Senegal" },
    { id: 198, code: "RS", name: "Serbia" },
    { id: 199, code: "SC", name: "Seychelles" },
    { id: 200, code: "SL", name: "Sierra Leona" },
    { id: 201, code: "SG", name: "Singapur" },
    { id: 202, code: "SX", name: "Isla de la María" },
    { id: 203, code: "SK", name: "Eslovaquia" },
    { id: 204, code: "SI", name: "Eslovenia" },
    { id: 205, code: "SB", name: "Islas Salomón" },
    { id: 206, code: "SO", name: "Somalia" },
    { id: 207, code: "ZA", name: "Sudáfrica" },
    { id: 208, code: "GS", name: "Islas Georgia del Sur y Sandwich del Sur" },
    { id: 209, code: "SS", name: "Sudán" },
    { id: 210, code: "ES", name: "España" },
    { id: 211, code: "LK", name: "Sri Lanka" },
    { id: 212, code: "SD", name: "Sudán" },
    { id: 213, code: "SR", name: "Surinam" },
    { id: 214, code: "SJ", name: "Svalbard y Jan Mayen" },
    { id: 215, code: "SE", name: "Suecia" },
    { id: 216, code: "CH", name: "Suiza" },
    { id: 217, code: "SY", name: "Siria" },
    { id: 218, code: "TW", name: "Taiwán" },
    { id: 219, code: "TJ", name: "Tayikistán" },
    { id: 220, code: "TZ", name: "Tanzania" },
    { id: 221, code: "TH", name: "Tailandia" },
    { id: 222, code: "TL", name: "Timor Oriental" },
    { id: 223, code: "TG", name: "Togo" },
    { id: 224, code: "TK", name: "Tokelau" },
    { id: 225, code: "TO", name: "Tonga" },
    { id: 226, code: "TT", name: "Trinidad y Tobago" },
    { id: 227, code: "TN", name: "Túnez" },
    { id: 229, code: "TM", name: "Turkmenistán" },
    { id: 230, code: "TC", name: "Islas Turcas y Caicos" },
    { id: 231, code: "TV", name: "Tuvalu" },
    { id: 232, code: "UG", name: "Uganda" },
    { id: 233, code: "UA", name: "Ucrania" },
    { id: 234, code: "AE", name: "Emiratos Árabes Unidos" },
    { id: 235, code: "GB", name: "Reino Unido" },
    { id: 236, code: "UM", name: "Islas menores alejadas de EE. UU." },
    { id: 237, code: "US", name: "Estados Unidos" },
    { id: 238, code: "UY", name: "Uruguay" },
    { id: 239, code: "UZ", name: "Uzbekistán" },
    { id: 240, code: "VU", name: "Vanuatu" },
    { id: 241, code: "VE", name: "Venezuela" },
    { id: 242, code: "VN", name: "Vietnam" },
    { id: 243, code: "VG", name: "Islas Vírgenes Británicas" },
    { id: 244, code: "VI", name: "Islas Vírgenes de EE. UU." },
    { id: 245, code: "WF", name: "Wallis y Futuna" },
    { id: 246, code: "EH", name: "Sahara Occidental" },
    { id: 247, code: "YE", name: "Yemen" },
    { id: 248, code: "ZM", name: "Zambia" },
    { id: 249, code: "ZW", name: "Zimbabwe" },
  ];

  // Insertar todos los países en la base de datos
  countries.forEach(async (country) => {
    const countryData = await prisma.country.create({
      data: {
        id: country.id,
        code: country.code,
        name: country.name,
      },
    });

    // console.log("Country data:", countryData);
  });
  res.status(200).json({ message: "Países insertados correctamente" });
});
app.get("/countries/get", async (req, res) => {
  const countries = await prisma.country.findMany({
    orderBy: {
      name: "asc",
    },
  });
  res.status(200).json(countries);
});
app.get("/countries/deleteall", async (req, res) => {
  // Borrar todos los paises de la tabla
  try {
    await prisma.country.deleteMany();
    res.status(200).json({ message: "Países borrados correctamente" });
  } catch (error) {
    console.error("Error deleting countries:", error);
    res.status(500).json({ error: "Error al borrar los países" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
