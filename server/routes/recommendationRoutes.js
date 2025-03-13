const express = require('express');
const router = express.Router();
const { addRecommendation, deleteRecommendation, getAllRecommendations } = require('../controllers/recommendationController');
const { verifyToken, isAdmin } = require('../middleware/auth'); // импортируем middleware


// Только админ может добавить рекомендацию
router.post('/add', verifyToken, isAdmin, addRecommendation);

// Только админ может удалить рекомендацию
router.delete('/delete/:id', verifyToken, isAdmin, deleteRecommendation);

// Этот маршрут может быть доступен для всех пользователей, чтобы они могли видеть все рекомендации
router.get('/', verifyToken, getAllRecommendations);

module.exports = router;
