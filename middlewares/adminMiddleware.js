// export const authorizeAdmin = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({ message: 'Usuario no autenticado' });
//   }

//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Acceso denegado: se requieren privilegios de administrador' });
//   }

//   next();
// };

// middlewares/adminMiddleware.js
export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Acceso denegado. Se requieren privilegios de administrador' 
    });
  }
  next();
};