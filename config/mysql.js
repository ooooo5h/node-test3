const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

const dbConfig = {
    host    : process.env.DB_HOST,     
    user    : process.env.DB_USER,
    database: process.env.DB_NAME,
    user    : process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

const connection = mysql.createPool(dbConfig);   

module.exports = connection;  