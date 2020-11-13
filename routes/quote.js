const express = require('express');
const router = express.Router();
const { getQuotes, postQuote, deleteQuote } = require('../controller/quote');
const { protectRoute } = require('../middleware/protectRoute');

router.use(protectRoute);
router.route('/quotes').get(getQuotes).post(postQuote);
router.route('/quotes/:id').delete(deleteQuote);

module.exports = router;
