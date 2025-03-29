const fs = require('fs');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'movie-db-movieweek.c.aivencloud.com',
    port: 15928,
    user: 'avnadmin',
    password: process.env.DB_PASSWORD, // Храни пароль в .env
    database: 'defaultdb',
    ssl: {
        ca: fs.readFileSync('./certs/ca.pem'), // Путь к сертификату
        rejectUnauthorized: true
    }
});
connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Успешно подключено к базе данных');
});

// Пример запроса к базе данных
connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
        console.error('Ошибка при выполнении запроса:', err);
        return;
    }
    console.log('Результаты запроса:', results);
});

// Закрытие соединения после работы
connection.end();
module.exports = pool;
