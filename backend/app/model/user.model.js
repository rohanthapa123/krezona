const { default: mongoose } = require("mongoose");


const UserSchemaDef = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["admin" , "user"],
        default: "user"
    }
})


const userModel = mongoose.model("User" , UserSchemaDef);

module.exports = userModel;