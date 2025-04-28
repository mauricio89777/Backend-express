import express from 'express';
import { 
  createBook, 
  getAllBooks, 
  getBookById, 
  updateBook, 
  deleteBook,
  getBooksByCategory
} from '../controllers/bookController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js'; // Cambia esto si usas export default

const router = express.Router();

// Rutas públicas
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.get('/category/:categoryId', getBooksByCategory);

// Rutas protegidas para usuarios autenticados
router.put('/:id', authMiddleware, updateBook);

// Rutas exclusivas para administradores
router.post('/', authMiddleware, adminMiddleware, createBook);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBook);

export default router;