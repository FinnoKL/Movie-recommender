const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Путь к модели пользователя (предположительно)
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';  // Лучше использовать переменную окружения для безопасности

// Регистрация пользователя
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Проверка на существование пользователя
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Сохранение нового пользователя
        const newUser = await User.create({ username, password: hashedPassword });

        // Генерация токена
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({
            message: 'Пользователь успешно зарегистрирован',
            token,
        });
    } catch (err) {
        console.error('Ошибка при регистрации:', err);
        res.status(500).json({ error: 'Ошибка на сервере' });
    }
};

// Логин пользователя
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Поиск пользователя
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        // Сравнение пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        // Генерация токена
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Авторизация прошла успешно',
            token,
        });
    } catch (err) {
        console.error('Ошибка при логине:', err);
        res.status(500).json({ error: 'Ошибка на сервере' });
    }
};

// Проверка токена
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Извлекаем токен из заголовка

    if (!token) {
        return res.status(403).json({ error: 'Доступ запрещён! Токен не найден.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Неверный токен' });
    }
};

// Проверка роли администратора
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Только администратор может выполнить это действие!' });
    }
    next();
};
