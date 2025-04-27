import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'navegando_libros',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Función de conexión para usar con el ORM
export const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexión a MySQL establecida');
    await connection.end();
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
    process.exit(1);
  }
};