const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/authRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

const helmet = require('helmet'); // Установи: npm install helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"]
        }
    }
}));

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Сервер работает! 🚀');
});
app.use('/auth', userRoutes);
app.use('/users', userRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/collection', collectionRoutes);
app.use('/api', reviewsRoutes);
app.use('/admin', adminRoutes);
app.listen(3000, () => console.log('Server running on port 3000'));
