'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Siift Schema
 */
var SiiftSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  // Currently tags are required, need to work on adding proper delimiting, tags as individual objects?
  tags: {
    type: [String]
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  latitude: {
    type: Number,
    default: 5
  },
  longitude: {
    type: Number,
    default: 10
  }
});

mongoose.model('Siift', SiiftSchema);
