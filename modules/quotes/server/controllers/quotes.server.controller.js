'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Quote = mongoose.model('Quote'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * Show the current quote
 */
exports.getquote = function (req, res) {

  Quote.findOneRandom(function(err, element) {
    if (err) console.log(err);
    res.json(element.quote);
  });

};
