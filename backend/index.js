import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRouter from "./router/productRouter.js";

dotenv.config();

const app = express();

const PORT = Number(
  process.env.PORT || process.env.BACKEND_PORT || 5000
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send(
    "<h1>Welcome to RESTful API Product Management App</h1>"
  );
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running",
  });
});

app.use("/api/products", productRouter);

async function startServer() {
  try {
    await connectDB();
    console.log("Database connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
