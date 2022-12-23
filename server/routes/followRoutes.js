const express = require('express');
const { followUser, unfollowUser } = require('../controllers/followController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/follow/:id').post(protect,followUser);
router.route('/unfollow/:id').post(protect,unfollowUser);

module.exports = router;