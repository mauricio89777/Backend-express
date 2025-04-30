// version con pool
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'libreria_online',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a MySQL establecida');
    connection.release(); // Libera el recurso
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
    process.exit(1);
  }
};
