const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


// Aquí importarías tus rutas
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/categories', require('./routes/categoryRoutes'));
// app.use('/api/books', require('./routes/bookRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})



//importe librerias de bcryptjs para encriptar contraseñas
// y jsowebtoken para validar JWT