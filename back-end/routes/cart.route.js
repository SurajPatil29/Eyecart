const express = require("express")
const ProductModel = require("../models/product.model")
const CartModel = require("../models/cart.model")

const cartRouter = express.Router()


cartRouter.post("/add", async (req, res, next) => {
    const {userId, productId} = req.body
    try {
        const product = await ProductModel.findById(productId)

        if (!product){
            return res.status(404).json({msg: "Product not found"})
        }

        const cart = await CartModel.findOne({userId})

        if(!cart){
            return res.status(404).json({msg: "Cart not found"})

        }

        if(cart.products.includes(productId)){
            return res.status(404).json({msg : "Product already in cart"})
        }

        cart.products.push(product)
        await cart.save()

        res.status(200).json(cart)
    } catch (error) {
        next(error)
    }
})



cartRouter.get("/:userId", async (req, res, next) => {
    const {userId} = req.params
    try {
        const cart = await CartModel.findOne({userId}).populate("products")

        if (!cart){
            return res.status(404).json({msg : "Cart not found"})
        }

        if(cart.products.length === 0){
            return res.status(200).json({msg : "cart is empty", products : []})
        }

        res.status(200).json(cart.products)
    } catch (error) {
        next(error)
    }
})


cartRouter.delete("/:userId/product/:productId", async (req, res, next) =>{
    const {userId, productId} = req.params
    try {
        const cart = await CartModel.findOne({userId})

        if(!cart){
            return res.status(404).json({msg: "Product not found in the cart"})
        }

        const productIndex = cart.products.indexOf(productId)
        if(productIndex){
            return res.status(404).json({msg: "Product not found in the cart"})
        }

        cart.products.splice(productIndex, 1)

        await cart.save()

        res.status(200).json({msg : "Product remove from cart SuccessFully"})
    } catch (error) {
        next(error)
    }
})



module.exports = cartRouter