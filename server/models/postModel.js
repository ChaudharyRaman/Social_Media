const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    comments:[
        {
            comment:{
                type:String
            },
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
        },
    ],
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // unique:true
    }],
    postImages:[{
        type:String,
    }],

}, { timestamps: true })

const Post = mongoose.model('Post',postSchema);
module.exports = Post;