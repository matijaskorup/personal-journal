const Post = require('../models/Post');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

exports.getPost = asyncHandler(async (req, res, next) => {
  let posts = await Post.find({ user: req.user.id }).sort({ date: -1 });
  if (!posts) {
    return next(new ErrorResponse('there is no posts', 404));
  }
  res.status(200).json({ success: true, data: posts });
});

exports.addPost = asyncHandler(async (req, res, next) => {
  let createPost = { ...req.body, user: req.user.id };
  let post = await Post.create(createPost);

  res.status(200).json({ success: true, data: post });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(
      new ErrorResponse(`Post with id: ${req.params.id}, does not exist`),
      404,
    );
  }
  res.status(200).json({ success: true, data: [] });
});
