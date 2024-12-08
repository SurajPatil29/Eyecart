mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const url = process.env.MONGO_URL


const connectDB = async () =>{
    try{
        const connection = await mongoose.connect(url)
        console.log(`MongoDB connected: ${connection.connection.host}`)
    }catch (error){
        console.error(`Database connection error: ${error.message}`)
        throw error; // rethrow thr error to be caught in index.js
    }
}

module.exports = connectDB