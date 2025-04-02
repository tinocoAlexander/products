import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js"; // Importar controladores de productos

const router = express.Router(); // Router para productos

router.get("/all", getProducts);
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 * /app/products/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *      '200':
 *        description: A successful response
 */

router.post("/create", createProduct);
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 * /app/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     responses:
 *      '200':
 *        description: A successful response
 */

router.patch("/update/:id", updateProduct);
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 * /app/products/update/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *      '200':
 *        description: A successful response
 */

router.delete("/delete/:id", deleteProduct);
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 * /app/products/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *      '200':
 *        description: A successful response
 */

export default router;
