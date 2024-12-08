const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : "Products"
        }
    ]
},{
    timestamps:true
})

const CartModel = mongoose.model("cart", cartSchema)

module.exports = CartModel