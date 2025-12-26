const express = require("express");
const router = express.Router();
const memoryStore = require("../data/memoryStore");

// GET /api/photos
router.get("/", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 20;

    const result = memoryStore.getPhotos(page, limit);
    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Error interno" });
  }
});

// POST /api/photos
router.post("/", (req, res) => {
  try {
    const { user, filename, originalFilename, base64 } = req.body;

    if (!user || !base64) {
      return res.status(400).json({
        success: false,
        error: "Faltan datos requeridos",
      });
    }

    if (!memoryStore.users.includes(user)) {
      return res.status(400).json({
        success: false,
        error: "Usuario no válido",
      });
    }

    const newPhoto = memoryStore.addPhoto({
      user,
      filename: filename || "imagen.jpg",
      originalFilename: originalFilename || "imagen.jpg",
      base64,
    });

    res.status(201).json({
      success: true,
      photo: newPhoto,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Error interno" });
  }
});

module.exports = router;