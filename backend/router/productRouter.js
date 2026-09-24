import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controller/productController.js";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/", updateProduct);
productRouter.delete("/", deleteProduct);

export default productRouter;
