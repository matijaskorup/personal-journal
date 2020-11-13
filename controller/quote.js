const Quote = require('../models/Quote');
const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

exports.getQuotes = asyncHandler(async (req, res, next) => {
  let quotes = await Quote.find({ user: req.user.id });

  if (!quotes) {
    return res
      .status(404)
      .json({ success: false, message: 'quotes not found' });
  }
  res.status(200).json({ success: true, data: quotes });
});

exports.postQuote = asyncHandler(async (req, res, next) => {
  let createQuote = { ...req.body, user: req.user.id };
  console.log(req.user);
  let quote = await Quote.create(createQuote);
  res.status(200).json({ success: true, data: quote });
});

exports.deleteQuote = asyncHandler(async (req, res, next) => {
  let quote = await Quote.findByIdAndRemove(req.params.id);
  if (!quote) {
    return next(
      new ErrorResponse(`quote with id: ${req.params.id} does not exist`, 404),
    );
  }
  res.status(200).json({ success: true, data: {} });
});
