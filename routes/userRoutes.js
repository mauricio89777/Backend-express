import express from 'express';
import { register, login, getAllUsers, promoteToAdmin,createAdminUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Registro de usuario
router.post('/register', register);

// Inicio de sesión
router.post('/login', login);

// Obtener todos los usuarios (protegido por autenticación)
router.get('/users', authMiddleware, getAllUsers);

// Promover usuario a administrador (protegido por autenticación y rol admin)
router.patch('/:userId/promote', authMiddleware, adminMiddleware, promoteToAdmin);

router.post('/create-admin', createAdminUser);
export default router;
