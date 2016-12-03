'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var random = require('mongoose-simple-random');

/**
 * Quote Schema
 */
var QuoteSchema = new Schema({
  quote: {
    type: String,
    default: '',
    trim: true,
    required: 'Quote cannot be blank'
  }
});

QuoteSchema.plugin(random);

mongoose.model('Quote', QuoteSchema);
