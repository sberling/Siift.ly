'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Siift = mongoose.model('Siift'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an siift
 */
exports.create = function (req, res) {
  var siift = new Siift(req.body);
  siift.user = req.user;

  siift.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(siift);
    }
  });
};

/**
 * Show the current siift
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var siift = req.siift ? req.siift.toJSON() : {};

  // Add a custom field to the Siift, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Siift model.
  siift.isCurrentUserOwner = !!(req.user && siift.user && siift.user._id.toString() === req.user._id.toString());

  res.json(siift);
};

/**
 * Update an siift
 */
exports.update = function (req, res) {
  var siift = req.siift;

  siift.title = req.body.title;
  siift.content = req.body.content;

  siift.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(siift);
    }
  });
};

/**
 * Delete an siift
 */
exports.delete = function (req, res) {
  var siift = req.siift;

  siift.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(siift);
    }
  });
};

/**
 * List of Siifts
 */
exports.list = function (req, res) {
  Siift.find().sort('-created').populate('user', 'displayName').exec(function (err, siifts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(siifts);
    }
  });
};

/**
 * Siift middleware
 */
exports.siiftByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Siift is invalid'
    });
  }

  Siift.findById(id).populate('user', 'displayName').exec(function (err, siift) {
    if (err) {
      return next(err);
    } else if (!siift) {
      return res.status(404).send({
        message: 'No siift with that identifier has been found'
      });
    }
    req.siift = siift;
    next();
  });
};
