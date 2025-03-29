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
module.exports = pool;
