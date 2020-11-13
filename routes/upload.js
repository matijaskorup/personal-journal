const express = require('express');
const router = express.Router();
const { upload } = require('../controller/uploadFiles');
const { protectRoute } = require('../middleware/protectRoute');
router.use(protectRoute);
router.route('/').get(upload);

module.exports = router;
