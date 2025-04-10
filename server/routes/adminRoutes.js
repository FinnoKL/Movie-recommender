const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
    getAllRecommendations,
    createRecommendation,
    updateRecommendation,
    deleteRecommendation
} = require('../controllers/adminController');

const router = express.Router();

// Получить все рекомендации (даже неопубликованные)
router.get('/recommendations', verifyToken, isAdmin, getAllRecommendations);

// Создать новую рекомендацию
router.post('/recommendations', verifyToken, isAdmin, createRecommendation);

// Обновить рекомендацию
router.put('/recommendations/:id', verifyToken, isAdmin, updateRecommendation);

// Удалить рекомендацию
router.delete('/recommendations/:id', verifyToken, isAdmin, deleteRecommendation);

module.exports = router;
