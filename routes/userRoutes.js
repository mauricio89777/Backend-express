import express from 'express';
import { register, 
         login, 
         getAllUsers, 
         promoteToAdmin, 
         createAdminUser, 
         updateUser, 
         deleteUser,
        getUserById,
        getUserByEmail,
        updateUserToken, } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// crear usuario comun
router.post('/register', register);

// Inicio de sesión (probar usuario comun)
router.post('/login', login);

// Obtener usuarios
router.get('/users', authMiddleware, getAllUsers);
router.get('/user/:id', getUserById);
router.get('/user/email/:email', getUserByEmail);

// Promover usuario a administrador (protegido por autenticación y rol admin)
router.patch('/:userId/promote', authMiddleware, adminMiddleware, promoteToAdmin);
//Crear usuario admin
router.post('/create-admin', createAdminUser);

router.put('/:id', updateUser); // Actualizar usuario
router.put('/user/token/:id', updateUserToken);
router.delete('/:id', deleteUser); // Eliminar usuario

export default router;
