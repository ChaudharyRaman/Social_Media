const express = require('express');
const { userLogin, registerUser, getAllUsers, getUser } = require('../controllers/userController');
const { getAuthUser } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/authenticate').post(userLogin);
router.route('/user').get(protect,getAuthUser).post(registerUser);
router.route('/allusers').get(protect,getAllUsers);
router.route('/user/:id').get(protect,getUser);

module.exports = router;