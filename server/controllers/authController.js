const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQyMTU0MDU1LCJleHAiOjE3NDQ3NDYwNTV9.gcfutO1xuTexYttBgvmMpkkGTEs5ahFa0tLka5tTDcY';

// Регистрация
exports.register = async (req, res) => {
    const { username, password, role = 'user' } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Register request received:", req.body);
    try {
        await pool.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role]
        );

        res.status(201).json({ success: true, message: 'Пользователь зарегистрирован' });
    } catch (err) {
        console.error('Ошибка регистрации:', err);
        res.status(400).json({ error: 'Пользователь уже существует' });
    }
};

// Логин
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const connection = await pool.getConnection();  // Получаем соединение
   
    try {
        const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        // Генерация токена
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '30d' });

        res.json({
            success: true,
            message: 'Авторизация успешна',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Ошибка при входе:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
    finally {
        connection.release();  // Обязательно освобождаем соединение
    }
};
