import express from 'express';
import { register, login, getAllUsers, promoteToAdmin } from '../controllers/userController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {adminMiddleware} from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Registro de usuario
router.post('/register', register);

// Login
router.post('/login', login);

// Obtener todos los usuarios (protegido por auth)
router.get('/users', authMiddleware, getAllUsers);

// Promover a admin (protegido por auth + solo admins)
router.patch('/:userId/promote', authMiddleware, adminMiddleware, promoteToAdmin);

export default router;
