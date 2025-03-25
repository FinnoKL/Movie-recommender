const jwt = require('jsonwebtoken');

const SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQyMTU0MDU1LCJleHAiOjE3NDQ3NDYwNTV9.gcfutO1xuTexYttBgvmMpkkGTEs5ahFa0tLka5tTDcY';

// Проверка токена
exports.verifyToken = (req, res, next) => {
    console.log('🔹 Заголовок Authorization:', req.headers.authorization);

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log('❌ Токен отсутствует!');
        return res.status(403).json({ error: 'Доступ запрещён! Токен не найден.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('✅ Декодированный токен:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.log('❌ Ошибка токена:', err.message);
        res.status(401).json({ error: 'Неверный токен' });
    }
};

// Проверка роли администратора
exports.isAdmin = (req, res, next) => {
    console.log('🔹 Роль пользователя:', req.user.role);

    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Только администратор может выполнить это действие!' });
    }
    next();
};
