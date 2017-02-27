'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Renovate = mongoose.model('Renovate'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Renovate
 */
exports.create = function(req, res) {
  var renovate = new Renovate(req.body);
  renovate.user = req.user;

  renovate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(renovate);
    }
  });
};

/**
 * Show the current Renovate
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var renovate = req.renovate ? req.renovate.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  renovate.isCurrentUserOwner = req.user && renovate.user && renovate.user._id.toString() === req.user._id.toString();

  res.jsonp(renovate);
};

/**
 * Update a Renovate
 */
exports.update = function(req, res) {
  var renovate = req.renovate;
  renovate.updated = Date.now();
  renovate.updater = req.user;
  if(renovate.status === 'approved'){
     renovate.approved = Date.now();
     renovate.approver = req.user;
  }
  renovate = _.extend(renovate, req.body);

  renovate.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(renovate);
    }
  });
};

/**
 * Delete an Renovate
 */
exports.delete = function(req, res) {
  var renovate = req.renovate;

  renovate.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(renovate);
    }
  });
};

/**
 * List of Renovates
 */
exports.list = function(req, res) {
  Renovate.find().sort('-created').populate('user', 'displayName').populate('department').exec(function(err, renovates) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(renovates);
    }
  });
};

/**
 * Renovate middleware
 */
exports.renovateByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Renovate is invalid'
    });
  }

  Renovate.findById(id).populate('user', 'displayName').populate('department').exec(function (err, renovate) {
    if (err) {
      return next(err);
    } else if (!renovate) {
      return res.status(404).send({
        message: 'No Renovate with that identifier has been found'
      });
    }
    req.renovate = renovate;
    next();
  });
};
