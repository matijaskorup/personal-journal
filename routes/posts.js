const express = require('express');
const router = express.Router();
const { getPost, addPost, deletePost } = require('../controller/posts');
const { protectRoute } = require('../middleware/protectRoute');

router.use(protectRoute);
router.route('/posts').get(getPost).post(addPost);
router.route('/deletepost/:id').delete(deletePost);

module.exports = router;
