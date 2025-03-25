const express = require('express');
const { getAllRecommendations, createRecommendation, deleteRecommendation } = require('../controllers/adminController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllRecommendations);
router.post('/', verifyToken, createRecommendation);
router.delete('/:id', verifyToken, deleteRecommendation);

module.exports = router;
