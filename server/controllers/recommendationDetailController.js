// recommendationDetailController.js
const pool = require('../models/db');  // подключение к базе данных

// Получение одной рекомендации по ID
exports.getRecommendationById = async (req, res) => {
    const { id } = req.params;
    console.log(`Получен запрос на рекомендацию с id: ${id}`);  // Логируем запрос
    try {
        const [rows] = await pool.query('SELECT * FROM recommendations WHERE id = ? AND published = 1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Рекомендация не найдена' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
