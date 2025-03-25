const express = require('express');
const { addToCollection } = require('../controllers/collectionController');
const router = express.Router();

// Добавить рекомендацию в коллекцию
router.post('/add', addToCollection);

module.exports = router;
