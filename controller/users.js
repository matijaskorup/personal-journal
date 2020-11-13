const User = require('../models/User');
const Quote = require('../models/Quote');
const Post = require('../models/Post');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

exports.getMe = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id);
  if (!profile) {
    return new ErrorResponse('User not found', 404);
  }
  res.status(200).json({ success: true, data: profile });
});

exports.deleteAccount = asyncHandler(async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id);
  await Quote.deleteMany({ user: req.user.id });
  await Post.deleteMany({ user: req.user.id });
  res.status(200).json({ success: true, data: {} });
});
