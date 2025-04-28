import mysql from 'mysql2/promise';
import { dbConfig } from '../config/db.js';

// Función auxiliar para obtener una conexión
const getConnection = async () => {
  return mysql.createConnection(dbConfig);
};

class User {
  // Crear usuario
  static async create({ name, email, password, role = 'usuario' }) {
    const connection = await getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO usuarios (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Actualizar token
  static async updateToken(userId, token) {
    const connection = await getConnection();
    try {
      const [result] = await connection.execute(
        'UPDATE usuarios SET token = ? WHERE id = ?',
        [token, userId]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al actualizar token:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Promover a administrador
  static async promoteToAdmin(userId) {
    const connection = await getConnection();
    try {
      const [result] = await connection.execute(
        'UPDATE usuarios SET role = "admin" WHERE id = ?',
        [userId]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al promover a admin:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Buscar por email
  static async findByEmail(email) {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );
      return rows[0] || null; // Mejor si no encuentra, devolver null explícitamente
    } catch (error) {
      console.error('Error al buscar por email:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Obtener todos los usuarios
  static async findAll() {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT id, name, email, role, created_at, updated_at FROM usuarios'
      );
      return rows;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Buscar por ID
  static async findById(id) {
    const connection = await getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM usuarios WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al buscar por ID:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Actualizar usuario
  static async update(id, { name, email }) {
    const connection = await getConnection();
    try {
      const [result] = await connection.execute(
        'UPDATE usuarios SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  // Eliminar usuario
  static async delete(id) {
    const connection = await getConnection();
    try {
      const [result] = await connection.execute(
        'DELETE FROM usuarios WHERE id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    } finally {
      await connection.end();
    }
  }
}

export default User;
