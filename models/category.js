import { dbConfig } from '../config/db.js';

class Category {
  // Crear una nueva categoría
  static async create({ name, description }) {
    const [result] = await db.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );
    return { id: result.insertId, name, description };
  }

  // Obtener todas las categorías
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM categories');
    return rows;
  }

  // Obtener una categoría por ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0]; // Solo 1 una categoría
  }

  // Actualizar una categoría
  static async update(id, { name, description }) {
    const [result] = await db.query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    return result.affectedRows; // Devuelve cuántas filas fueron afectadas
  }

  // Eliminar una categoría
  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    return result.affectedRows; // Devuelve cuántas filas fueron afectadas
  }
}

export default Category;
