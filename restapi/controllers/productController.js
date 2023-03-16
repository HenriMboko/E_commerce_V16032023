
const productModel = require("../models/productModel")

const getProduct = async (req, res, next) => {
    const products = await productModel.find({});
    res.status(200).json(products)

}


const getProductByID = async (req, res, next) => {


    const product = await productModel.findById(req.params.id);

    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json({ message: "Product no found" })
    }

}



module.exports = {
    getProduct,
    getProductByID
}