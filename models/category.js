import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Opcional: para que no haya dos categorías iguales
    trim: true    // Opcional: quita espacios al principio y final
  },
  description: {
    type: String,
    default: '', // Opcional: si no ponen descripción, queda vacío
    trim: true
  }
}, {
  timestamps: true // Agrega automáticamente createdAt y updatedAt
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
