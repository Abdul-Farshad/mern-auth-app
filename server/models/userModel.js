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
    
}, {timestamps: true});

const User = mongoose.model("User", userSchema)

module.exports = User;

