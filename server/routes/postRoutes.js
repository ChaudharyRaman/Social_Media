const express = require('express');
const { uploadPost, getAllPost, getPost, likePost, unlikePost, commentPost } = require('../controllers/postController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/posts').post(protect,uploadPost);
router.route('/allposts').get(protect,getAllPost);
router.route('/posts/:id').get(getPost);
router.route('/like/:id').post(protect,likePost);
router.route('/unlike/:id').post(protect,unlikePost)
router.route('/comment/:id').post(protect,commentPost)

module.exports = router;