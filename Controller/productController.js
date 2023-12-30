const Product = require("../Model/Product");
const fs = require("fs");

module.exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
module.exports.getProductByCollection = async (req, res) => {
  try {
    const product = await Product.find({
      product_collection: req.params.collection,
    });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
module.exports.getProductByCategory = async (req, res) => {
  try {
    const product = await Product.find({
      category: req.params.category,
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
module.exports.createProduct = async (req, res, next) => {
  const {
    product_name,
    product_detail,
    product_price,
    category,
    product_collection,
    countInStock,
  } = req.body;

  try {
    await Product.create({
      product_name,
      product_detail,
      product_price,
      category,
      product_collection,
      countInStock,
      product_image: req.product_image,
    });
    return res.status(200).json({
      status: "sucess",
      message: "successfully created",
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    product_collection,
    category,
    countInStock,
    oldImagePath,
  } = req.body;

  try {
    if (req.product_image) {
      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          product_name,
          product_detail,
          product_price,
          product_collection,
          category,
          countInStock,
          product_image: req.product_image,
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          product_name,
          product_detail,
          product_price,
          product_collection,
          category,
          countInStock,
        }
      );
    }
    return res.status(200).json({
      status: "sucess",
      message: "successfully updated",
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
module.exports.deleteProduct = async (req, res) => {
  const { product_image } = req.body;
  try {
    await Product.findByIdAndDelete({ _id: req.params.id });

    fs.unlink(`.${product_image}`, (err) => {});

    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Failed to delete the file",
        error: err.message,
      });
    }
    return res.status(200).json({
      status: "success",
      message: `successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: `${err}`,
    });
  }
};

module.exports.PostReview = async (req, res) => {
  const userId = req.userId;
  const productId = req.params.id;
  const { username, comment, rating } = req.body;

  try {
    const product = await Product.findById(productId);

    if (product) {
      const isAlreadyReviewed = product.reviews.find(
        (rev) => rev.user.toString() === userId
      );

      if (isAlreadyReviewed) {
        return res.status(400).json({
          status: "error",
          message: "You have already reviewed this product",
        });
      } else {
        product.reviews.push({
          username,
          comment,
          rating: Number(rating),
          user: userId,
        });

        const totalRating = product.reviews.reduce((a, b) => a + b.rating, 0);
        product.rating = totalRating / product.reviews.length;
        product.numreviews = product.reviews.length;

        await product.save();

        return res.status(201).json({
          status: "success",
          message: "Review added successfully",
        });
      }
    } else {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports.searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    const searchResult = await Product.find({
      $or: [
        { product_name: { $regex: keyword, $options: "i" } },
        { product_detail: { $regex: keyword, $options: "i" } },
      ],
    })
    res.json(searchResult);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "products not found",
    });
  }
};
