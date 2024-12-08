const  dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")
const TokenModel = require("../models/token.model")
const UserModel = require("../models/signUp.model")

const key = process.env.JWT_SECRET_KEY1

const auth = async (req, res, next) => {
    
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({msg: "No token provided. Please log in"})
    }

    try {
        const expToken = await TokenModel.findOne({token})
        if(expToken){
            return res.status(401).json({msg: "Session expired. Please log in again."})
        }

        const decoded = jwt.verify(token, key)

        const user = await UserModel.findOne({_id: decoded.id})
        if(!user){
            return res.status(404).json({msg: "User not found. Please log in again."})
        }

        req.user = user
        next()
    } catch (error) {
        if (error.name === "JsonWebTokenError"){
            return res.status(401).json({ msg: "Invalid token. Please log in again." });
        }
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({ msg: "Token expired. Please log in again." });
        }

        next(error);
    }
}


module.exports = auth;