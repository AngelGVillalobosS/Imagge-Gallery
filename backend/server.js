const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://angelgvillaloboss-image-gallery.netlify.app"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const photosRouter = require("./src/routes/photos");
const chatRouter = require("./src/routes/chat");

app.use("/api/photos", photosRouter);
app.use("/api/chat", chatRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend is working",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "API for Gallery and ChatBox",
    endpoints: {
      photos: "/api/photos",
      chat: "/api/chat",
      health: "/api/health",
    },
  });
});

// Rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
});

// Control de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend ejecutandose en el puerto: ${PORT}`);
  console.log("Endpoints disponibles:");
  console.log("   GET  /              - Documentación");
  console.log("   GET  /api/health    - Estado del servidor");
  console.log("   GET  /api/photos    - Obtener fotos");
  console.log("   POST /api/photos    - Subir foto");
  console.log("   GET  /api/chat      - Obtener mensajes");
  console.log("   POST /api/chat      - Enviar mensaje");
});
