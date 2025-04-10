<<<<<<< HEAD
const pool = require('../models/db'); // Убедитесь, что путь правильный
=======
const pool = require('../db');
>>>>>>> 73c897f7010bcf20f80cbc035e8e2e3bb7ab289b

exports.addToCollection = async (req, res) => {
    console.log("Получен запрос на добавление:", req.body);
    
    try {
        const { user_id, recommendation_id, status } = req.body;
        
        // Проверка данных
        if (!user_id || !recommendation_id || !status) {
            return res.status(400).json({ error: "Не хватает обязательных полей" });
        }

        // Проверяем, существует ли уже запись
        const [existing] = await pool.query(
            "SELECT * FROM user_collections WHERE user_id = ? AND recommendation_id = ?",
            [user_id, recommendation_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({ error: "Элемент уже в коллекции" });
        }

        // Добавляем в БД
        const [result] = await pool.query(
            "INSERT INTO user_collections (user_id, recommendation_id, status) VALUES (?, ?, ?)",
            [user_id, recommendation_id, status]
        );

        console.log("Добавлено в БД:", result);
        res.status(201).json({ success: true });
        
    } catch (err) {
        console.error("Ошибка в контроллере:", err);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};