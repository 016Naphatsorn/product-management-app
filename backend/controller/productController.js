import Product from "../model/productModules.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;

    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "กรุณากรอกชื่อและราคาให้ครบถ้วน" });
    }

    const newProduct = await Product.create({
      name,
      price: Number(price),
      description,
      image,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "ไม่พบสินค้า",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "ไม่พบสินค้า",
      });
    }

    const { name, price, description, image } = req.body;

    await product.update({
      name,
      price: Number(price),
      description,
      image,
    });

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "ไม่พบสินค้า",
      });
    }

    await product.destroy();

    return res.status(200).json({
      message: "ลบสินค้าสำเร็จ",
    });
  } catch (error) {
    return next(error);
  }
};

export {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
