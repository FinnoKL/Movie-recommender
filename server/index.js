const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const collectionRoutes = require('./routes/collectionRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const adminRoutes = require('./routes/adminRoutes');
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());


app.get('/', (req, res) => {
    res.send('Сервер работает! 🚀');
});

app.use('/collection', collectionRoutes);
app.use('/api', reviewsRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));