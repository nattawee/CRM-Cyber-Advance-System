// Aquisitions service used to communicate Aquisitions REST endpoints
(function () {
  'use strict';

  angular
    .module('aquisitions')
    .factory('AquisitionsService', AquisitionsService);

  AquisitionsService.$inject = ['$resource'];

  function AquisitionsService($resource) {
    return $resource('api/aquisitions/:aquisitionId', {
      aquisitionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
