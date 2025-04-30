
//pool de los huebos

import { pool } from '../config/db.js';

class User {
  // Crear usuario
  static async create({ name, email, password, role = 'usuario' }) {
    try {
      const [result] = await pool.query(
        'INSERT INTO usuarios (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  // Actualizar token
  static async updateToken(userId, token) {
    try {
      const [result] = await pool.query(
        'UPDATE usuarios SET token = ? WHERE id = ?',
        [token, userId]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al actualizar token:', error);
      throw error;
    }
  }

  // Promover a administrador
  static async promoteToAdmin(userId) {
    try {
      const [result] = await pool.query(
        'UPDATE usuarios SET role = "admin" WHERE id = ?',
        [userId]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al promover a admin:', error);
      throw error;
    }
  }

  // Buscar por email
  static async findByEmail(email) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al buscar por email:', error);
      throw error;
    }
  }

  // Obtener todos los usuarios
  static async findAll() {
    try {
      const [rows] = await pool.query(
        'SELECT id, name, email, role, created_at, updated_at FROM usuarios'
      );
      return rows;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  // Buscar por ID 
  static async findById(id) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al buscar por ID:', error);
      throw error;
    }
  }

  // Actualizar usuario
  static async update(id, { name, email }) {
    try {
      const [result] = await pool.query(
        'UPDATE usuarios SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  // Eliminar usuario
  static async delete(id) {
    try {
      const [result] = await pool.query(
        'DELETE FROM usuarios WHERE id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }
}

export default User;





