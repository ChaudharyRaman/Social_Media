const express = require('express');
const { userLogin } = require('../controllers/userController');
const { getAuthUser } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/authenticate').post(userLogin);
router.route('/user').get(protect,getAuthUser);

module.exports = router;