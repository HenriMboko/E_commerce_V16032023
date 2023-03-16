const express = require("express");
const productRouter = express.Router();

const { getProduct, getProductByID } = require("../controllers/productController")


// @desc Fetch all products
// @route Get/api/products
// @access Public
productRouter.get("/", getProduct)

// @desc Fetch products by Id
// @route Get/api/products/:id
// @access Public

productRouter.get("/:id", getProductByID)


module.exports = productRouter;