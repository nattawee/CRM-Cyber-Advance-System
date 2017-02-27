// Generals service used to communicate Generals REST endpoints
(function () {
  'use strict';

  angular
    .module('generals')
    .factory('GeneralsService', GeneralsService);

  GeneralsService.$inject = ['$resource'];

  function GeneralsService($resource) {
    return $resource('api/generals/:generalId', {
      generalId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
