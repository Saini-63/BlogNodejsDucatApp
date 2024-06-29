const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    }
})

const blogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema)

module.exports = blogModel;