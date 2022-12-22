const express = require('express');
const { userLogin, getAuthUser } = require('../controllers/userController');
const { followUser, unfollowUser } = require('../controllers/followController');
const protect = require('../middlewares/authMiddleware');
const { uploadPost, likePost, getAllPost, unlikePost, commentPost, getPost } = require('../controllers/postController');
const router = express.Router();

router.route('/authenticate').post(userLogin);
router.route('/user').get(protect,getAuthUser);

router.route('/follow/:id').post(protect,followUser);
router.route('/unfollow/:id').post(protect,unfollowUser);

router.route('/posts').post(protect,uploadPost);
router.route('/allposts').get(protect,getAllPost);
router.route('/posts/:id').get(getPost);
router.route('/like/:id').post(protect,likePost);
router.route('/unlike/:id').post(protect,unlikePost)
router.route('/comment/:id').post(protect,commentPost)

module.exports = router;