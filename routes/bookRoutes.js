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
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
const router = express.Router();

// Rutas protegidas (requieren autenticación)
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', authMiddleware, updateBook);
router.get('/category/:categoryId', getBooksByCategory);

//rutas de admins
router.post('/', authMiddleware, adminMiddleware, createBook);
router.delete('/:id', authMiddleware, adminMiddleware, deleteBook);

export default router;