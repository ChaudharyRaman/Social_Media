const express = require('express');
const { followUser, unfollowUser } = require('../controllers/followController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/users/:id/follow').post(protect,followUser);
router.route('/users/:id/unfollow').post(protect,unfollowUser);

module.exports = router;