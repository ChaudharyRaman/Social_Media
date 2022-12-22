const express = require('express');
const { userLogin } = require('../controllers/authenticate');
const { followUser } = require('../controllers/followController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(userLogin);
// router.route('/follow/:id').post(protect,followUser)

module.exports = router;