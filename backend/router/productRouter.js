import { Router } from "express";
import { createProduct } from "../controller/productController.js";

const productRouter = Router();

productRouter.post("/", createProduct);

export default productRouter;
