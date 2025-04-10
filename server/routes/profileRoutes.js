const express = require("express");
const router = express.Router();
const pool = require("../models/db");

// Добавление в коллекцию
router.post("/collections", async (req, res) => {
    try {
        const { user_id, item_id, item_type, status } = req.body;
        
        await pool.query(
            "INSERT INTO user_collections (user_id, item_id, item_type, status) VALUES (?, ?, ?, ?)",
            [user_id, item_id, item_type, status]
        );
        
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Получение коллекции
router.get("/collections", async (req, res) => {
    try {
        const { user_id, status } = req.query;
        const [items] = await pool.query(
            "SELECT * FROM user_collections WHERE user_id = ? AND status = ?",
            [user_id, status]
        );
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;