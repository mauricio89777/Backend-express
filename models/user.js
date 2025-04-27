import mysql from 'mysql2/promise';
import { dbConfig } from '../config/db.js';

class User {
  // Crear usuario
  static async create(userData) {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [result] = await connection.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [userData.name, userData.email, userData.password]
      );
      return result.insertId;
    } finally {
      await connection.end();
    }
  }


  //ver rol de administrador
  static async promoteToAdmin(userId) {
    const connection = await mysql.createConnection(dbConfig);
    try {
      await connection.execute(
        'UPDATE users SET role = "admin" WHERE id = ?',
        [userId]
      );
    } finally {
      await connection.end();
    }
  }

  // Buscar por email
  static async findByEmail(email) {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      return rows;
    } finally {
      await connection.end();
    }
  }

  // Obtener todos los usuarios
  static async findAll() {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [rows] = await connection.execute('SELECT id, name, email FROM users');
      return rows;
    } finally {
      await connection.end();
    }
  }

  // Obtener usuario por ID
  static async findById(id) {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [rows] = await connection.execute(
        'SELECT id, name, email FROM users WHERE id = ?',
        [id]
      );
      return rows[0];
    } finally {
      await connection.end();
    }
  }
}

export default User;