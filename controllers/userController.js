import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = (req, res) => {
  const { name, email, password, role = 'user'} = req.body;

  // Opcional: Solo admins pueden crear otros admins
  if (role === 'admin' && (!req.user || req.user.role !== 'admin')) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  if (!(name && email && password)) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error en la encriptación' });

    User.create({ name, email, password: hashedPassword }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al registrar usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role // Añadir el rol en la respuesta
        }
      });
    });
  });
};

export const getAllUsers = (req, res) => {
  User.findAll((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
};


export const promoteToAdmin = async (req, res) => {
  try {
    await User.promoteToAdmin(req.params.userId);
    res.json({ message: 'Usuario promovido a administrador' });
  } catch (error) {
    res.status(500).json({ message: 'Error al promover usuario' });
  }
};





//crearomos el primer admin
// INSERT INTO users (name, email, password, role) 
// VALUES ('Admin', 'admin@example.com', 'hash_contraseña', 'admin');