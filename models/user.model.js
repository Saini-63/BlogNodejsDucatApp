const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    contact: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = userModel;