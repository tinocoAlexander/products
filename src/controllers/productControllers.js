import Product from "../models/productModel.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al listar productos:", error);
    res.status(500).json({ message: "Error al listar productos" });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl, category } = req.body;

  if (!name || !description || !price || !stock || !category) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      return res.status(400).json({ message: "El nombre del producto ya existe" });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl,
      category,
      status: true,
      creationDate: new Date(),
    });

    return res.status(201).json({ message: "Producto creado correctamente", data: newProduct });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, imageUrl, category } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (name) {
      const existing = await Product.findOne({ where: { name } });
      if (existing && existing.id !== parseInt(id)) {
        return res.status(400).json({ message: "Ya existe un producto con ese nombre" });
      }
    }

    await product.update({
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      stock: stock || product.stock,
      imageUrl: imageUrl || product.imageUrl,
      category: category || product.category,
    });

    return res.status(200).json({ message: "Producto actualizado correctamente", data: product });

  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// Eliminar (lógicamente) un producto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({ message: 'No se ha encontrado el registro' }); 
    }

    if (!product.status) {
      return res.status(400).json({ message: 'El producto ya ha sido eliminado' }); 
    }

    await product.update({
      status: false
    });

    res.status(200).json({ message: 'Producto eliminado correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};
