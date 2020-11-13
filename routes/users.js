const express = require('express');
const router = express.Router();
const { deleteAccount, getMe } = require('../controller/users');
const { protectRoute } = require('../middleware/protectRoute');

router.route('/me').get(protectRoute, getMe);
router.route('/deleteuser/:id').delete(protectRoute, deleteAccount);

module.exports = router;
