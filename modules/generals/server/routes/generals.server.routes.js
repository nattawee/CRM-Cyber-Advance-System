'use strict';

/**
 * Module dependencies
 */
var generalsPolicy = require('../policies/generals.server.policy'),
  generals = require('../controllers/generals.server.controller');

module.exports = function(app) {
  // Generals Routes
  app.route('/api/generals').all(generalsPolicy.isAllowed)
    .get(generals.list)
    .post(generals.create);

  app.route('/api/generals/:generalId').all(generalsPolicy.isAllowed)
    .get(generals.read)
    .put(generals.update)
    .delete(generals.delete);

  // Finish by binding the General middleware
  app.param('generalId', generals.generalByID);
};
