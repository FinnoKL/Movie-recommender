// controllers/recommendationController.js
const pool = require('../models/db');

// Добавление новой рекомендации
exports.addRecommendation = async (req, res) => {
    const { title, description} = req.body; // предположим, что у нас есть эти поля

    if (!title || !description) {
        return res.status(400).json({ error: 'Title, description, and image URL are required' });
    }

    try {
        await pool.query(
            'INSERT INTO recommendations (title, description) VALUES (?, ?)',
            [title, description]
        );
        res.status(201).json({ message: 'Recommendation added' });
    } catch (err) {
        console.error('Error adding recommendation:', err);
        res.status(500).json({ error: 'Error adding recommendation', details: err.message });
    }
};

// Удаление рекомендации
exports.deleteRecommendation = async (req, res) => {
    const recommendationId = req.params.id;

    try {
        const [rows] = await pool.query('SELECT * FROM recommendations WHERE id = ?', [recommendationId]);

        if (!rows.length) {
            return res.status(404).json({ error: 'Recommendation not found' });
        }

        await pool.query('DELETE FROM recommendations WHERE id = ?', [recommendationId]);
        res.status(200).json({ message: 'Recommendation deleted' });
    } catch (err) {
        console.error('Error deleting recommendation:', err);
        res.status(500).json({ error: 'Error deleting recommendation', details: err.message });
    }
};

// Получение всех рекомендаций
exports.getAllRecommendations = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recommendations');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching recommendations:', err);
        res.status(500).json({ error: 'Error fetching recommendations', details: err.message });
    }
};
