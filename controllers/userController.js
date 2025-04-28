import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import validator from 'validator';


//crerar usurario
export const createAdminUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Este correo electrónico ya está registrado' });
    }

    // Crear el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario admin
    await User.create({ name: 'Admin', email, password: hashedPassword, role: 'admin' });

    res.status(201).json({ message: 'Administrador creado exitosamente' });
  } catch (error) {
    console.error('Error al crear administrador:', error);
    res.status(500).json({ message: 'Error al crear administrador' });
  }
};

// Registrar usuario comun
export const register = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  // Solo admins pueden crear otros admins
  if (role === 'admin' && (!req.user || req.user.role !== 'admin')) {
    return res.status(403).json({ message: 'No autorizado para crear administradores' });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Formato de correo electrónico inválido' });
  }

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Este correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role }, // Incluir role en el token
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Obtener todos los usuarios-------requiere se probada
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Promover usuario a admin
export const promoteToAdmin = async (req, res) => {
  try {
    const updated = await User.promoteToAdmin(req.params.userId);
    if (updated === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario promovido a administrador' });
  } catch (error) {
    console.error('Error al promover usuario:', error);
    res.status(500).json({ message: 'Error al promover usuario' });
  }
};

// Actualizar usuario no los tengo en la ruta debo de hacerlo
export const updateUser = async (req, res) => {
  try {
    const updated = await User.update(req.params.id, req.body);
    if (updated === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.delete(req.params.id);
    if (deleted === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
