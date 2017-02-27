// Leads service used to communicate Leads REST endpoints
(function () {
  'use strict';

  angular
    .module('leads')
    .factory('LeadsService', LeadsService);

  LeadsService.$inject = ['$resource'];

  function LeadsService($resource) {
    return $resource('api/leads/:leadId', {
      leadId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
