const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String, 
        required : true,
        trim : true
    },
    birthDate: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum : ["male", "female"],
        required: true
    },
    profileImage:{
        type: String // cloudinry URL
    }
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel