// createdAt: Date
// content: String
// views: Number
// imageUrl: string
// author: User
const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const PostsModel = mongoose.model('Post',PostSchema)
module.exports = PostsModel;