import express from 'express';
import { 
  createBook, 
  getAllBooks, 
  getBookById, 
  updateBook, 
  deleteBook,
  getBooksByCategory,
  getBooksByAuthor,
} from '../controllers/bookController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/category/:categoryId', getBooksByCategory);
router.get('/author/:authorId', getBooksByAuthor);
router.get('/:id', getBookById);

// Rutas protegidas para usuarios autenticados
router.put('/:id', authMiddleware, updateBook);

// Rutas exclusivas para administradores
router.post('/', authMiddleware, adminMiddleware, createBook);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBook);

export default router;