const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

exports.register = asyncHandler(async (req, res, next) => {
  const { username, password, email } = req.body;

  const user = await User.create({
    username,
    password,
    email,
  });

  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(new ErrorResponse('please add a username or password', 401));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('User does not exist', 401));
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('invalid password', 401));
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwt();
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
};

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});
