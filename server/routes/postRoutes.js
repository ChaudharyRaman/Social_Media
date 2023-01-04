const express = require('express');
const { uploadPost, getAllPost, getPost, likePost, unlikePost, commentPost, getFollowingsPost } = require('../controllers/postController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/posts').post(protect,uploadPost);
router.route('/allposts').get(protect,getAllPost);
router.route('/posts/:id').get(getPost);
router.route('/posts/:id/like').post(protect,likePost);
router.route('/posts/:id/unlike').post(protect,unlikePost)
router.route('/posts/:id/comment').post(protect,commentPost)
router.route('/getFollowingsPost').get(protect,getFollowingsPost)

module.exports = router;