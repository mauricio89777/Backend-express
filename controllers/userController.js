const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    
  if (!(name && email && password)) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }
  
}