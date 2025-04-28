import Category from '../models/category.js'; // Asegúrate de tener el modelo "Category"

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({ message: 'Categoría creada exitosamente', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la categoría', details: error.message });
  }
};

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías', details: error.message });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría', details: error.message });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría actualizada exitosamente', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la categoría', details: error.message });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría', details: error.message });
  }
};
