'use strict';

/**
 * Module dependencies
 */
var renovatesPolicy = require('../policies/renovates.server.policy'),
  renovates = require('../controllers/renovates.server.controller');

module.exports = function(app) {
  // Renovates Routes
  app.route('/api/renovates').all(renovatesPolicy.isAllowed)
    .get(renovates.list)
    .post(renovates.create);

  app.route('/api/renovates/:renovateId').all(renovatesPolicy.isAllowed)
    .get(renovates.read)
    .put(renovates.update)
    .delete(renovates.delete);

  // Finish by binding the Renovate middleware
  app.param('renovateId', renovates.renovateByID);
};
