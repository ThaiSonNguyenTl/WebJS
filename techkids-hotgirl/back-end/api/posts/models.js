// title 
// content
// description
// view 
//like
// author:user_id
const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title : String,
    content : String ,
    description: String,
    view : {
        type: Number,
        default: 0,
    },
    like : {
        type: Number,
        default: 0 
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    author : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    }
});
const PostModel = mongoose.model('post',PostSchema)
module.exports = PostModel;