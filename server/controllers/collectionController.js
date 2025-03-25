const pool = require('../models/db');

exports.addToCollection = async (req, res) => {
    const { user_id, recommendation_id, status } = req.body;

    // Проверяем, что все обязательные параметры переданы
    if (!user_id || !recommendation_id || !status) {
        return res.status(400).json({ error: 'user_id, recommendation_id и status обязательны' });
    }

    // Проверяем, что статус имеет допустимое значение
    if (status !== 'watched' && status !== 'want_to_watch') {
        return res.status(400).json({ error: 'Недопустимый статус' });
    }

    console.log('Добавление в коллекцию:', req.body); // Логируем данные из тела запроса

    try {
        await pool.query(
            'INSERT INTO user_collections (user_id, recommendation_id, status) VALUES (?, ?, ?)',
            [user_id, recommendation_id, status]
        );
        res.status(201).json({ message: 'Добавлено в коллекцию' });
    } catch (err) {
        console.error('Ошибка при добавлении в коллекцию:', err); // Логируем ошибку
        res.status(500).json({ error: 'Ошибка сервера', details: err.message });
    }
};
