'use strict';

/**
 * Module dependencies
 */
var aquisitionsPolicy = require('../policies/aquisitions.server.policy'),
  aquisitions = require('../controllers/aquisitions.server.controller');

module.exports = function(app) {
  // Aquisitions Routes
  app.route('/api/aquisitions').all(aquisitionsPolicy.isAllowed)
    .get(aquisitions.list)
    .post(aquisitions.create);

  app.route('/api/aquisitions/:aquisitionId').all(aquisitionsPolicy.isAllowed)
    .get(aquisitions.read)
    .put(aquisitions.update)
    .delete(aquisitions.delete);

  // Finish by binding the Aquisition middleware
  app.param('aquisitionId', aquisitions.aquisitionByID);
};
