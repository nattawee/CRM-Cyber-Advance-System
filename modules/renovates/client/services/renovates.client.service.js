// Renovates service used to communicate Renovates REST endpoints
(function () {
  'use strict';

  angular
    .module('renovates')
    .factory('RenovatesService', RenovatesService);

  RenovatesService.$inject = ['$resource'];

  function RenovatesService($resource) {
    return $resource('api/renovates/:renovateId', {
      renovateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
