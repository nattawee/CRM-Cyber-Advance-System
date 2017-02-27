'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Aquisitions Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin','viewer','dataentry','approver', 'superuser'],
    allows: [{
      resources: '/api/aquisitions',
      permissions: '*'
    }, {
      resources: '/api/aquisitions/:aquisitionId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/aquisitions',
      permissions: ['get', 'post']
    }, {
      resources: '/api/aquisitions/:aquisitionId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/aquisitions',
      permissions: ['get']
    }, {
      resources: '/api/aquisitions/:aquisitionId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Aquisitions Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Aquisition is being processed and the current user created it then allow any manipulation
  if (req.aquisition && req.user && req.aquisition.user && req.aquisition.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
