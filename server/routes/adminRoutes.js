const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const adminController = require('../controllers/authController');

router.get('/dashboard', verifyToken, isAdmin, (req, res) => {
    res.json({ message: 'Добро пожаловать в админскую панель' });
});

module.exports = router;
