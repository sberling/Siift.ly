'use strict';

/**
 * Module dependencies
 */
var quotesPolicy = require('../policies/quotes.server.policy'),
  quotes = require('../controllers/quotes.server.controller');

module.exports = function (app) {
  // Quotes collection routes
  app.route('/api/quotes/getquote').all(quotesPolicy.isAllowed)
    .get(quotes.getquote);

};
