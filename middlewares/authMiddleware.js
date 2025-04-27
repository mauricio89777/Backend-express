import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // Obtener el token del header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Añadir el payload decodificado a la request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};