var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const reviewShcema = new Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

const productSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    name: {
        type: String,
        required: [true, "Insert title product"]
    },
    image: {
        type: String,

    },
    brand: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true

    },
    reviews: [reviewShcema],
    rating: {
        type: Number,
        required: true,
        default: 0

    },
    numReviews: {
        type: Number,
        required: true,
        default: 0

    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },

}, { timestamps: true })


const productModel = mongoose.model("products", productSchema);


module.exports = productModel;
