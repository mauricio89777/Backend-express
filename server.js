import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import paypalRoutes from './routes/paypalRoute.js';
import { connectDB } from './config/db.js';

// Inicializar
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/books', bookRoutes);

app.use('/api/paypal', paypalRoutes);


app.get('/', (req, res) => {
    res.send('API funcionando');
  });

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ message: 'Error interno del servidor' });
});
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
