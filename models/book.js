import mysql from 'mysql2/promise';
import { dbConfig } from '../config/db.js';

class Book {
  // Crear un nuevo libro
  static async create(bookData) {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [result] = await connection.execute(
        'INSERT INTO books (title, author, category_id, description, published_year) VALUES (?, ?, ?, ?, ?)',
        [bookData.title, bookData.author, bookData.category_id, bookData.description, bookData.published_year]
      );
      return result.insertId;
    } finally {
      await connection.end();
    }
  }

  // Obtener todos los libros
  static async findAll() {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [rows] = await connection.execute(
        `SELECT b.*, c.name as category_name 
         FROM books b 
         LEFT JOIN categories c ON b.category_id = c.id`
      );
      return rows;
    } finally {
      await connection.end();
    }
  }

  // Obtener libro por ID
  static async findById(id) {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [rows] = await connection.execute(
        `SELECT b.*, c.name as category_name 
         FROM books b 
         LEFT JOIN categories c ON b.category_id = c.id 
         WHERE b.id = ?`,
        [id]
      );
      return rows[0];
    } finally {
      await connection.end();
    }
  }

  // Actualizar libro
  static async update(id, bookData) {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [result] = await connection.execute(
        'UPDATE books SET title=?, author=?, category_id=?, description=?, published_year=? WHERE id=?',
        [bookData.title, bookData.author, bookData.category_id, bookData.description, bookData.published_year, id]
      );
      return result.affectedRows;
    } finally {
      await connection.end();
    }
  }

  // Eliminar libro
  static async delete(id) {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [result] = await connection.execute(
        'DELETE FROM books WHERE id=?',
        [id]
      );
      return result.affectedRows;
    } finally {
      await connection.end();
    }
  }

  // Buscar libros por categoría
  static async findByCategory(categoryId) {
    const connection = await mysql.createConnection(dbConfig);
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM books WHERE category_id=?',
        [categoryId]
      );
      return rows;
    } finally {
      await connection.end();
    }
  }
}

export default Book;