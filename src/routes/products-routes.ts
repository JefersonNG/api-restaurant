import { Router } from "express";
import { ProductController } from "@/controllers/products-controllers";

const productsRoutes = Router();
const productController = new ProductController();

productsRoutes.get("/", productController.index);
productsRoutes.post("/", productController.create);

export { productsRoutes };
