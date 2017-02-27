'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Lead = mongoose.model('Lead'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Lead
 */
exports.create = function(req, res) {
  var lead = new Lead(req.body);
  lead.user = req.user;

  lead.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lead);
    }
  });
};

/**
 * Show the current Lead
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var lead = req.lead ? req.lead.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  lead.isCurrentUserOwner = req.user && lead.user && lead.user._id.toString() === req.user._id.toString();

  res.jsonp(lead);
};

/**
 * Update a Lead
 */
exports.update = function(req, res) {
  var lead = req.lead;

  lead = _.extend(lead, req.body);

  lead.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lead);
    }
  });
};

/**
 * Delete an Lead
 */
exports.delete = function(req, res) {
  var lead = req.lead;

  lead.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lead);
    }
  });
};

/**
 * List of Leads
 */
exports.list = function(req, res) {
  Lead.find().sort('-created').populate('user', 'displayName').exec(function(err, leads) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(leads);
    }
  });
};

/**
 * Lead middleware
 */
exports.leadByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Lead is invalid'
    });
  }

  Lead.findById(id).populate('user', 'displayName').exec(function (err, lead) {
    if (err) {
      return next(err);
    } else if (!lead) {
      return res.status(404).send({
        message: 'No Lead with that identifier has been found'
      });
    }
    req.lead = lead;
    next();
  });
};
