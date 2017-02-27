'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Renovates Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin', 'viewer','dataentry','approver', 'superuser'],
    allows: [{
      resources: '/api/renovates',
      permissions: '*'
    }, {
      resources: '/api/renovates/:renovateId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/renovates',
      permissions: ['get', 'post']
    }, {
      resources: '/api/renovates/:renovateId',
      permissions: ['get']
    }]
  }, {
    roles: ['viewer'],
    allows: [{
      resources: '/api/renovates',
      permissions: ['get']
    }, {
      resources: '/api/renovates/:renovateId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Renovates Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Renovate is being processed and the current user created it then allow any manipulation
  if (req.renovate && req.user && req.renovate.user && req.renovate.user.id === req.user.id) {
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
