import Category from '../models/category.js'; 

// Crear una nueva categoría
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
  }

  try {
    const newCategory = await Category.create({ name, description });
    res.status(201).json({ message: 'Categoría creada exitosamente', category: newCategory });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error al crear categoría' });
  }
};

// Obtener todas las categorías
//el problema es que lo saco como nombre no name
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    console.log('Categorias de la base datos (Original):', categories); // Log para depuración

    // Mapear los resultados para cambiar 'nombre' a 'name'
    const categoriesForFrontend = categories.map(cat => ({
      id: cat.id,
      name: cat.nombre, // <-- Mapeamos de 'nombre' (BD) a 'name' (frontend)
    }));

    console.log('Categorias enviadas al frontend (Mapeadas):', categoriesForFrontend); // Log para depuración

    res.status(200).json(categoriesForFrontend); //arreglo mapaedo

  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ message: 'Error al obtener categoría' });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updated = await Category.update(id, { name, description });
    if (updated === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error al actualizar categoría' });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Category.delete(id);
    if (deleted === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
};
