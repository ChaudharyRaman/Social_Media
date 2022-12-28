const asyncHandler = require('express-async-handler');
const Follow = require('../models/followModel');
const User = require('../models/userModel');

// Follow user ---
// 1- increasing following of auth user
// 2- increase follower of follow user

// 1->

const followUser = asyncHandler(async (req, res) => {
    const { id: followUserId } = req.params;

    try {
        const followingUser = await Follow.findOneAndUpdate({ user: req.user._id }, {
            $addToSet: {
                following: followUserId,
            }
        }, { new: true });
        // console.log(followUserId, req.user._id);

        const followUser = await Follow.findOneAndUpdate({user:followUserId},{
            $addToSet:{
                followers:req.user._id,
            }
        },{new:true})
        .populate("followers","username email")
        .populate("following","username email")
        
        console.log(followingUser);
        res.json(followUser)
    } catch (error) {
        throw new Error(error.message)
    }


});

const unfollowUser = asyncHandler(async(req,res)=>{
    const  {id:followedUserId} = req.params;

    try{

        const authUser = await Follow.findOneAndUpdate({user:req.user._id},{
            $pull:{
                following:followedUserId,
            }
        },{new:true})
        const followedUser = await Follow.findOneAndUpdate({user:followedUserId},{
            $pull:{
                followers:req.user._id,
            }
        },{new:true}).populate("followers","username email")
        .populate("following","username email")
        // ----->
        // console.log(authUser,followedUser);
        // if(!authUser || !followedUser){
        //     throw new Error("User is not Following Each Other");
        // }
        res.json(followedUser);

    }catch(error){
        throw new Error(error.message);
    }

})

module.exports = { followUser, unfollowUser }