const asyncHandler = require('express-async-handler');
const { Types } = require('mongoose');
const Post = require('../models/postModel');

const uploadPost = asyncHandler(async (req, res) => {

    try {


        var post = await Post.create({
            user: req.user._id,
            postImages: req.body.postImageUrls,
            ...req.body,
        })

        // console.log(post);
        // post = await post.populate("user","username updatedAt")
        res.send(post)

    } catch (error) {
        res.status(401);
        // throw new Error("Unable to create Post")
        throw new Error(error.message)
    }

});
const getAllPost = asyncHandler(async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id }).populate({
            path: 'user',
            select: 'username updatedAt'
        })
            // .select('-like')
            .select('-updatedAt')
            .sort({ createdAt: -1 })

        res.send(posts);

    } catch (error) {
        res.status(401);
        res.send(error.message)
    }
});

const likePost = asyncHandler(async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findByIdAndUpdate({ _id: postId }, {
            $addToSet: {
                like: req.user._id,
            }
        }, { new: true }).populate('like', " email username");
        // const post = 
        res.json(post.like)
    } catch (error) {
        throw new Error(error.message)
    }

});
const unlikePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findOneAndUpdate({ _id: postId }, {
            $pull: {
                like: req.user._id,
            }
        }, { new: true }).populate('like', "username email _id");
        // const post = await Post.find({_id:postId})
        res.json(post.like)
    } catch (error) {
        throw new Error(error.message);
    }

})

const commentPost = asyncHandler(async (req, res) => {
    const { id: postId } = req.params;
    const { comment } = req.body;

    try {
        const post = await Post.findOneAndUpdate({ _id: postId }, {
            $push: {
                comments: {
                    comment: comment,
                    user: req.user._id,
                }
            }
        }, { new: true });

        res.json(post)
    } catch (error) {
        throw new Error(error.message)
    }



})

const getPost = asyncHandler(async (req, res) => {
    const { id: postId } = req.params;
    try {
        const post = await Post.findById(postId)
            .populate('like', 'username')
            .populate({
                path: 'comments.user',
                select: 'username'
            })
        res.json(post);
    } catch (error) {
        throw new Error(error.message);
    }
});


module.exports = { uploadPost, getAllPost, likePost, unlikePost, commentPost, getPost }