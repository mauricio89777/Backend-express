import Book from '../models/book.js';

export const createBook = async (req, res) => {
  try {
    const bookId = await Book.create(req.body);
    res.status(201).json({ id: bookId, message: 'Libro creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el libro' });
  }
};

// Obtener todos los libros
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los libros' });
  }
};

// Obtener un libro por ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el libro' });
  }
};

// Actualizar un libro


export const updateBook = async (req, res) => {
  try {
    const affectedRows = await Book.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el libro' });
  }
};



// Eliminar un libro
export const deleteBook = async (req, res) => {
  try {
    const affectedRows = await Book.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json({ message: 'Libro eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el libro' });
  }
};

// Obtener libros por categoría
export const getBooksByCategory = async (req, res) => {
  try {
    const books = await Book.findByCategory(req.params.categoryId);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener libros por categoría' });
  }
};


export const getBooksByAuthor = async (req, res) => {
  try {
    const authorId = parseInt(req.params.authorId);
    
    if (isNaN(authorId)) {
      return res.status(400).json({ 
        message: 'El ID del autor debe ser un número válido' 
      });
    }

    const books = await Book.findByAuthor(authorId);
    if (books.length === 0) {
      const [author] = await pool.query('SELECT id FROM autores WHERE id = ?', [authorId]);
      if (author.length === 0) {
        return res.status(404).json({ 
          message: 'El autor especificado no existe' 
        });
      }
      
      return res.status(200).json({ 
        message: 'Este autor no tiene libros registrados',
        books: [] 
      });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error en getBooksByAuthor:', error);
    res.status(500).json({ 
      message: 'Error al buscar libros por autor',
      error: error.message 
    });
  }
};