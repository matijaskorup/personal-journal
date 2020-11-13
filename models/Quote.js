const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  userQuotes: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;
