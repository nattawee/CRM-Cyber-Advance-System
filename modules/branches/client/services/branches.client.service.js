// Branches service used to communicate Branches REST endpoints
(function () {
  'use strict';

  angular
    .module('branches')
    .factory('BranchesService', BranchesService);

  BranchesService.$inject = ['$resource'];

  function BranchesService($resource) {
    return $resource('api/branches/:branchId', {
      branchId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
