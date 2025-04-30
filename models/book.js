// import { pool } from '../config/db.js';


// //revisa las consultas libros y categorias
// //fijate en las relaicones esten correctamente realcionadas con la tabla 
// //categoria y author
// class Book {
//   // Crear un nuevo libro
//   static async create(bookData) {
//     try {
//       const [result] = await pool.query(
//         'INSERT INTO libros (title, author_id, price, rating, image, description, category_id, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//         [bookData.title, bookData.author_id, bookData.price, bookData.rating, bookData.image, bookData.description, bookData.category_id, bookData.stock]
//       );
//       return { id: result.insertId, ...bookData }; // Devolver el libro con su ID asignado
//     } catch (error) {
//       console.error('Error al crear libro:', error);
//       throw error;
//     }
//   }

//   // Obtener todos los libros
//   static async findAll() {
//     try {
//       const [rows] = await pool.query(
//         `SELECT b.*, c.name as category_name, a.name as author_name 
//          FROM libros b 
//          LEFT JOIN categorias c ON b.category_id = c.id 
//          LEFT JOIN autores a ON b.author_id = a.id`
//       );
//       return rows;
//     } catch (error) {
//       console.error('Error al obtener libros:', error);
//       throw error;
//     }
//   }

//   // Obtener libro por ID
//   static async findById(id) {
//     try {
//       const [rows] = await pool.query(
//         `SELECT b.*, c.name as category_name, a.name as author_name 
//          FROM libros b 
//          LEFT JOIN categorias c ON b.category_id = c.id 
//          LEFT JOIN autores a ON b.author_id = a.id 
//          WHERE b.id = ?`,
//         [id]
//       );
//       return rows[0];
//     } catch (error) {
//       console.error('Error al obtener libro por ID:', error);
//       throw error;
//     }
//   }

//   // Actualizar libro
//   static async update(id, bookData) {
//     try {
//       const [result] = await pool.query(
//         'UPDATE libros SET title=?, author_id=?, price=?, rating=?, image=?, description=?, category_id=?, stock=? WHERE id=?',
//         [bookData.title, bookData.author_id, bookData.price, bookData.rating, bookData.image, bookData.description, bookData.category_id, bookData.stock, id]
//       );
//       return result.affectedRows; // Número de filas afectadas
//     } catch (error) {
//       console.error('Error al actualizar libro:', error);
//       throw error;
//     }
//   }

//   // Eliminar libro
//   static async delete(id) {
//     try {
//       const [result] = await pool.query(
//         'DELETE FROM libros WHERE id=?',
//         [id]
//       );
//       return result.affectedRows; // Número de filas afectadas
//     } catch (error) {
//       console.error('Error al eliminar libro:', error);
//       throw error;
//     }
//   }

//   // Buscar libros por categoría------------------revisa categoria_id
//   static async findByCategory(categoryId) {
//     try {
//       const [rows] = await pool.query(
//         'SELECT * FROM libros WHERE category_id=?',
//         [categoryId]
//       );
//       return rows;
//     } catch (error) {
//       console.error('Error al buscar libros por categoría:', error);
//       throw error;
//     }
//   }
// }

// export default Book;




import { pool } from '../config/db.js';

class Book {
  // Crear un nuevo libro
  static async create(bookData) {
    try {
      // Validaciones básicas
      if (!bookData.title || !bookData.author_id || !bookData.category_id) {
        throw new Error('Faltan campos obligatorios');
      }
      
      if (bookData.stock < 0) {
        throw new Error('El stock no puede ser negativo');
      }

      const [result] = await pool.query(
        'INSERT INTO libros (title, author_id, price, rating, image, description, category_id, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [bookData.title, bookData.author_id, bookData.price, bookData.rating, bookData.image, bookData.description, bookData.category_id, bookData.stock]
      );
      return { id: result.insertId, ...bookData };
    } catch (error) {
      console.error('Error al crear libro:', error);
      throw error;
    }
  }

  // Obtener todos los libros con información de autor y categoría
  static async findAll() {
    try {
      const [rows] = await pool.query(
        `SELECT b.*, c.nombre as category_name, a.nombre as author_name 
         FROM libros b 
         LEFT JOIN categorias c ON b.category_id = c.id 
         LEFT JOIN autores a ON b.author_id = a.id`
      );
      return rows;
    } catch (error) {
      console.error('Error al obtener libros:', error);
      throw error;
    }
  }

  // Obtener libro por ID con información relacionada
  static async findById(id) {
    try {
      const [rows] = await pool.query(
        `SELECT b.*, c.nombre as category_name, a.nombre as author_name 
         FROM libros b 
         LEFT JOIN categorias c ON b.category_id = c.id 
         LEFT JOIN autores a ON b.author_id = a.id 
         WHERE b.id = ?`,
        [id]
      );
      if (rows.length === 0) return null;
      return rows[0];
    } catch (error) {
      console.error('Error al obtener libro por ID:', error);
      throw error;
    }
  }

  // Actualizar libro
  static async update(id, bookData) {
    try {
      // Validación de stock
      if (bookData.stock !== undefined && bookData.stock < 0) {
        throw new Error('El stock no puede ser negativo');
      }

      const [result] = await pool.query(
        'UPDATE libros SET title=?, author_id=?, price=?, rating=?, image=?, description=?, category_id=?, stock=? WHERE id=?',
        [bookData.title, bookData.author_id, bookData.price, bookData.rating, bookData.image, bookData.description, bookData.category_id, bookData.stock, id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al actualizar libro:', error);
      throw error;
    }
  }

  // Eliminar libro
  static async delete(id) {
    try {
      // Verificar si el libro está en algún pedido antes de borrar
      const [pedidos] = await pool.query(
        'SELECT id FROM detalle_pedido WHERE libro_id = ?',
        [id]
      );
      
      if (pedidos.length > 0) {
        throw new Error('No se puede eliminar, el libro está asociado a pedidos');
      }

      const [result] = await pool.query(
        'DELETE FROM libros WHERE id=?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      throw error;
    }
  }

  // Buscar libros por categoría (revisar si funciona?)
  static async findByCategory(categoryId) {
    try {
      const [rows] = await pool.query(
        `SELECT b.*, c.nombre as category_name, a.nombre as author_name 
         FROM libros b 
         LEFT JOIN categorias c ON b.category_id = c.id 
         LEFT JOIN autores a ON b.author_id = a.id 
         WHERE b.category_id=?`,
        [categoryId]
      );
      return rows;
    } catch (error) {
      console.error('Error al buscar libros por categoría:', error);
      throw error;
    }
  }

  // Método adicional útil: Buscar libros por autor(revisar si funciona)
  static async findByAuthor(authorId) {
    try {
      const [rows] = await pool.query(
        `SELECT b.*, a.nombre as author_name 
         FROM libros b 
         LEFT JOIN autores a ON b.author_id = a.id 
         WHERE b.author_id=?`,
        [authorId]
      );
      return rows;
    } catch (error) {
      console.error('Error al buscar libros por autor:', error);
      throw error;
    }
  }
}

export default Book;