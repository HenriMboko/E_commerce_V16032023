const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const productModel = require("./models/productModel")
const orderModel = require("./models/orderModel");
const connectDb = require("./config/db")
const users = require("./data/user")
const products = require("./data/products");
const colors = require("colors")
require("dotenv").config()

connectDb();


const importData = async () => {
    try {
        await orderModel.deleteMany();
        await productModel.deleteMany();
        await userModel.deleteMany();


        const creatUser = await userModel.insertMany(users)
        const adminUser = creatUser[0]._id


        const simplProduct = products.map(product => {
            return { ...product, user: adminUser }
        })


        await productModel.insertMany(simplProduct);

        console.log(colors.america("Data Imported...!"));
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit()
    }
}


const detroyData = async () => {
    try {
        await orderModel.deleteMany();
        await productModel.deleteMany();
        await userModel.deleteMany();

        console.log(colors.america("Data Destroyed...!"));
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}


if (process.argv[2] === '-d') {
    detroyData()
} else {
    importData()
}