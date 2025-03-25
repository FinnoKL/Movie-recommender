const pool = require('../models/db');

// Получить все рекомендации (включая неопубликованные)
exports.getAllRecommendations = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recommendations');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Создать новую рекомендацию
exports.createRecommendation = async (req, res) => {
    try {
        const { title, description, published } = req.body;
        await pool.query(
            'INSERT INTO recommendations (title, description, published) VALUES (?, ?, ?)',
            [title, description, published || false]
        );
        res.status(201).json({ message: 'Рекомендация создана' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Обновить рекомендацию
exports.updateRecommendation = async (req, res) => {
    try {
        const { title, description, published } = req.body;
        await pool.query(
            'UPDATE recommendations SET title = ?, description = ?, published = ? WHERE id = ?',
            [title, description, published, req.params.id]
        );
        res.json({ message: 'Рекомендация обновлена' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Удалить рекомендацию
exports.deleteRecommendation = async (req, res) => {
    try {
        await pool.query('DELETE FROM recommendations WHERE id = ?', [req.params.id]);
        res.json({ message: 'Рекомендация удалена' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
