const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        require: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String, 
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String, 
        require: true,
    },
    profilePicture: {
        type: String,
        default: 'https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/circle-user-512.png'
    }
    
}, {timestamps: true});

const User = mongoose.model("User", userSchema)

module.exports = User;

