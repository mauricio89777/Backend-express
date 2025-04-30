import { pool } from '../config/db.js';

class Category {
  // Crear una nueva categoría
  static async create({ name }) {
    if (!name) {
      throw new Error('El nombre de la categoría no puede estar vacío');
    }
    
    const [result] = await pool.query(
      'INSERT INTO categorias (nombre) VALUES (?)',  // Asegúrate que la columna se llama 'nombre' en la base de datos
      [name]
    );
    return { id: result.insertId, name };
  }

  // Obtener todas las categorías
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
  }

  // Obtener una categoría por ID
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0]; // Solo 1 categoría
  }

  // Actualizar una categoría
  static async update(id, { name }) {
    if (!name) {
      throw new Error('El nombre de la categoría no puede estar vacío');
    }

    const [result] = await pool.query(
      'UPDATE categorias SET nombre = ? WHERE id = ?',
      [name, id]
    );
    return result.affectedRows; // Número de filas afectadas
  }

  // Eliminar una categoría
  static async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM categorias WHERE id = ?',
      [id]
    );
    return result.affectedRows; // Número de filas afectadas
  }
}

export default Category;
