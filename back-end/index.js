const express = require("express")
const connectDB = require("./config/db")
const signUpRouter = require("./routes/signUp.route")
const profileRouter = require("./routes/profile.route")
const { eyeglassesRoute, screenglassesRoute, kidsglassesRoute, productRoute } = require("./routes/product.route")
const homeRoute = require("./routes/home.route")
const auth = require("./middlewares/authentication.middleware")
const cartRouter = require("./routes/cart.route")
const favouriteRouter = require("./routes/favorit.route")
const searchRouter = require("./routes/search.route")

const errorHandler = require("./middlewares/errorHandler.middleware")
const dotenv = require("dotenv").config()
const cors = require("cors")

 

const PORT = process.env.PORT || 3022

const app = express()
app.use(express.json())

app.use(cors({
    origin : ""
}))


app.use("/user", signUpRouter)
app.use("/profile", auth, profileRouter)
app.use("/eyeGlasses", auth, eyeglassesRoute)
app.use("/screenGlasses", auth, screenglassesRoute)
app.use("/kidsGlasses", auth, kidsglassesRoute)
app.use("/product", productRoute )
app.use("/cart",auth, cartRouter)
app.use("/favourite", auth, favouriteRouter)
app.use("/home", homeRoute)
app.use("/search",auth, searchRouter)




connectDB().then(()=>{
    console.log("Connected to the database")

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(error => {
    console.error(`Failed to connect to the database : ${error.message}`)
    process.exit(1)
})


app.use((req, res, next) =>{
    const error = new Error("Resourse not Found")
    error.statusCode = 404
    next(error)
})

app.use(errorHandler)