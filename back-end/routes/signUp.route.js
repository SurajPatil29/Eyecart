const express = require("express")
const UserModel = require("../models/signUp.model")
const validateSignupData = require("../middlewares/signUp.middleware")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const TokenModel = require("../models/token.model")
const validateLoginData = require("../middlewares/login.middleware")
const CartModel = require("../models/cart.model")
const FavouriteModel = require("../models/favorite.model")

const dotenv = require("dotenv").config()

const key1 = process.env.JWT_SECRET_KEY1
 

const signUpRouter = express.Router()

signUpRouter.post("/signup", validateSignupData, async (req, res, next) => {
    const { name, birthDate, email, password, gender } = req.body

    try {
        const isExistingUser = await UserModel.findOne({ email })
        if (isExistingUser) {
            return res.status(400).json({ msg: "Email already Exists" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new UserModel({
            name, birthDate, email, password: hashPassword, gender
        })

        const savedUser = await user.save()

        const newCart = new CartModel({
            userId: savedUser._id,
            products: []
        })
        await newCart.save()

        const newFav = new FavouriteModel({
            userId: savedUser.id,
            products: []
        })
        await newFav.save()
        res.status(201).json({ msg: "User registered successfully", user: savedUser })

    }catch(error){
        next(error)
    }
})


signUpRouter.post("/login", validateLoginData, async (req, res, next) =>{
    const {email, password} = req.body
    try{
        const user = await UserModel.findOne({email})
        if (!user) {
            return res.status (400).json({msg:"User not found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            const token = jwt.sign({id:user.id}, key1)

            res.status(200).json({
                msg: "Login successfull",
                token,
                id: user.id
            })
        }else{
            res.status(400).json({msg:"Wrong password"})
        }
    }catch(error){
        next(error)
    }
})


signUpRouter.post("/logout", async (req, res, next) =>{
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if (!token) {
        return res.status(400).send("Token is required")
    }
    try{
        const expToken = new TokenModel({token})
        await expToken.save()
        res.status(200).send("token is blocked")

        
    }catch(error){
        next(error)
    }
})



module.exports = signUpRouter