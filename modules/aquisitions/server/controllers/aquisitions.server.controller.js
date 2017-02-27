'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Aquisition = mongoose.model('Aquisition'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Aquisition
 */
exports.create = function(req, res) {
  var aquisition = new Aquisition(req.body);
  aquisition.user = req.user;

  aquisition.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aquisition);
    }
  });
};

/**
 * Show the current Aquisition
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var aquisition = req.aquisition ? req.aquisition.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  aquisition.isCurrentUserOwner = req.user && aquisition.user && aquisition.user._id.toString() === req.user._id.toString();

  res.jsonp(aquisition);
};

/**
 * Update a Aquisition
 */
exports.update = function(req, res) {
  var aquisition = req.aquisition;

  aquisition = _.extend(aquisition, req.body);

  aquisition.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aquisition);
    }
  });
};

/**
 * Delete an Aquisition
 */
exports.delete = function(req, res) {
  var aquisition = req.aquisition;

  aquisition.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aquisition);
    }
  });
};

/**
 * List of Aquisitions
 */
exports.list = function(req, res) {
  Aquisition.find().sort('-created').populate('user', 'displayName').exec(function(err, aquisitions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(aquisitions);
    }
  });
};

/**
 * Aquisition middleware
 */
exports.aquisitionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Aquisition is invalid'
    });
  }

  Aquisition.findById(id).populate('user', 'displayName').exec(function (err, aquisition) {
    if (err) {
      return next(err);
    } else if (!aquisition) {
      return res.status(404).send({
        message: 'No Aquisition with that identifier has been found'
      });
    }
    req.aquisition = aquisition;
    next();
  });
};
