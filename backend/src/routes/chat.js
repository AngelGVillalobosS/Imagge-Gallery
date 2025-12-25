const express = require("express");
const router = express.Router();
const memoryStore = require("../data/memoryStore");

// GET /api/chat
router.get("/", (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const messages = memoryStore.getLastMessages(limit);

    res.json({
      success: true,
      messages,
      total: memoryStore.messages.length,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal error" });
  }
});

// POST /api/chat
router.post("/", (req, res) => {
  try {
    const { user, text } = req.body;
    if (!user || !text) {
      return res.status(400).json({
        success: false,
        error: "Required data is missing",
      });
    }
    if (typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "The text isn't valid",
      });
    }
    if (!memoryStore.users.includes(user)) {
      return res.status(400).json({
        success: false,
        error: "The user isn't valid",
      });
    }

    const newMessage = memoryStore.addMsg({ user, text: text.trim() });
    res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal error" });
  }
});

// GET /api/chat/random-user
router.get("/random-user", (req, res) => {
  try {
    const randomUser = memoryStore.getRandomUser();
    res.json({
      success: true,
      user: randomUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Error" });
  }
});

module.exports = router;
