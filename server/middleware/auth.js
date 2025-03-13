const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Доступ запрещён' });
    }

    try {
        const decoded = jwt.verify(token, 'a3f1c2d4e5b6a7f8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2');  // Проверяем токен
        req.user = decoded;  // Добавляем данные из токена в req.user
        next();  // Передаем управление следующему middleware
    } catch (err) {
        res.status(401).json({ error: 'Неверный токен' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Только администратор может выполнить это действие' });
    }
    next();
};
