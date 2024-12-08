const { required } = require("joi")
const mongoose = require("mongoose")


const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    products: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Products"
        }
    ]
},{
    timestamps:true
})


const FavoriteModel = mongoose.model("Favorite", favoriteSchema)

module.exports = FavoriteModel