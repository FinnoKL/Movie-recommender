const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');

const SECRET_KEY = 'a3f1c2d4e5b6a7f8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2';

exports.register = async (req, res) => {
    const { username, password, role = 'user' } = req.body; // По умолчанию обычный пользователь
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role]);

        res.status(201).json({ message: 'Пользователь зарегистрирован' });
    } catch (err) {
        console.error('Ошибка регистрации:', err);
        res.status(400).json({ error: 'Пользователь уже существует' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
        }

        // Генерация токена с ролью
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '30d' });

        res.json({
            message: 'Авторизация успешна',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role // Возвращаем роль
            }
        });

    } catch (err) {
        console.error('Ошибка при входе:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
};
