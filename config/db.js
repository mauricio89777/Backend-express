const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) =>{
    if (err){
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexion a Mysql existosa');
});


module.exports = db;