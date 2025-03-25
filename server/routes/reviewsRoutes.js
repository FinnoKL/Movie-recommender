const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

// Маршрут для добавления отзыва
router.post('/reviews', reviewsController.addReview);

//// Маршрут для получения отзывов для конкретной рекомендации
//router.get('/reviews/:recommendation_id', reviewController.getReviews);

module.exports = router;
