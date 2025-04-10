const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./db'); // Предполагаю, что это ваша база данных
const authRoutes = require('./routes/authRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); 
const profileRoutes = require('./routes/profileRoutes');
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'https://movie-recommender-dr2p.onrender.com',  // Разрешаем только ваш frontend
}));

// Статика для фронтенда
app.use(express.static(path.join(__dirname, '../client/build')));

// Проверка подключения к базе данных
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.json({ db: "Connected!", calculation: rows[0].result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

<<<<<<< HEAD


app.use('/api/profile', profileRoutes);
app.use('/api', userRoutes);
// index.js
app.use('/api/collection', collectionRoutes);  // Убедитесь, что это есть
=======
// Обработчик всех остальных запросов на фронтенд
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Маршруты API
app.use('/collection', collectionRoutes);
app.use('/api', reviewsRoutes);
>>>>>>> 73c897f7010bcf20f80cbc035e8e2e3bb7ab289b
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
