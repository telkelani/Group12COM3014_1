const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = Schema({
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    }, 
    user: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String
        }
    },
    createdAt: {
        type: Date
    }
})

const Post = mongoose.model('Post', postSchema,'posts')

module.exports = Post