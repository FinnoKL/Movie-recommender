const pool = require('../models/db'); // подключение к базе данных

// Получение только опубликованных рекомендаций
exports.getPublishedRecommendations = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recommendations WHERE published = 1');
        res.json(rows); // Отправляем только опубликованные рекомендации
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

