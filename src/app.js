// Configuración de express
import bodyParser from "body-parser";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import swaggerSpec from "./api-docs.js";
import swaggerUI from "swagger-ui-express";

const app = express();

app.use(bodyParser.json());
app.use("/app/products", productRoutes); // Ruta base para productos
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); // Documentación Swagger

export default app;
