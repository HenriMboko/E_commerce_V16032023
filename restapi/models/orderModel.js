var mongoose = require("mongoose");
var Schema = mongoose.Schema;




const orderSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    oderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            products: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "products"
            },
        }
    ],
    shippingAddress:
    {
        address: { type: String, required: true },
        city: { type: String, required: true },
        pistalCode: { type: String, required: true },
        country: { type: String, required: true },

    },
    payementMethod: {
        type: String,
        required: true,
    },
    payementResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: String,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    }



}, { timestamps: true })


const orderModel = mongoose.model("orders", orderSchema);


module.exports = orderModel;