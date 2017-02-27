'use strict';

/**
 * Module dependencies
 */
var leadsPolicy = require('../policies/leads.server.policy'),
  leads = require('../controllers/leads.server.controller');

module.exports = function(app) {
  // Leads Routes
  app.route('/api/leads').all(leadsPolicy.isAllowed)
    .get(leads.list)
    .post(leads.create);

  app.route('/api/leads/:leadId').all(leadsPolicy.isAllowed)
    .get(leads.read)
    .put(leads.update)
    .delete(leads.delete);

  // Finish by binding the Lead middleware
  app.param('leadId', leads.leadByID);
};
