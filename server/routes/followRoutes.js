const express = require('express');
const router = express.Router();

router.route('/').post(userLogin);

module.exports = router;