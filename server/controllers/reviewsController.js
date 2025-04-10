const pool = require('../db');

exports.addReview = async (req, res) => {
    const { user_id, recommendation_id, review_text } = req.body;

    // Проверяем, что все необходимые данные присутствуют
    if (!user_id || !recommendation_id || !review_text) {
        return res.status(400).json({ error: 'user_id, recommendation_id и review_text обязательны' });
    }

    try {
        // Вставляем новый отзыв в таблицу reviews
        await pool.query(
            'INSERT INTO reviews (user_id, recommendation_id, review_text) VALUES (?, ?, ?)',
            [user_id, recommendation_id, review_text]
        );

        res.status(201).json({ message: 'Отзыв добавлен' });
    } catch (err) {
        console.error('Ошибка при добавлении отзыва:', err);
        res.status(500).json({ error: 'Ошибка сервера', details: err.message });
    }
};
