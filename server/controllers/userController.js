const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const User = require('../models/userModel');
const Follow = require('../models/followModel');

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            // _id:user._id,
            // username:user.username,
            // email:user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error("Invalid User and Password")
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all fields")
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User Already Exist");
    }


    const user = await User.create({
        username,
        email,
        password,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        res.send("Unable to register User")
    }

})

const getAuthUser = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const followData = await Follow.findOne({ "user": req.user._id })

        res.send({
            _id: user._id,
            userName: user.username,
            followers: followData.followers,
            following: followData.following,
        })
    } catch (error) {
        res.status(401);
        throw new Error("Error Occured in Getting User Data");
    }

});

module.exports = { userLogin, getAuthUser, registerUser }