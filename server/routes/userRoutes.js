const express = require('express');
const { getPublishedRecommendations } = require('../controllers/userController');
const { getRecommendationById } = require('../controllers/recommendationDetailController');

const router = express.Router();

// userRoutes.js
router.get('/recommendations', getPublishedRecommendations);       // /api/recommendations
router.get('/recommendations/:id', getRecommendationById);         // /api/recommendations/:id
module.exports = router;
