(function () {
  'use strict';

  angular
    .module('aquisitions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('aquisitions', {
        abstract: true,
        url: '/aquisitions',
        template: '<ui-view/>'
      })
      .state('aquisitions.list', {
        url: '',
        templateUrl: 'modules/aquisitions/client/views/list-aquisitions.client.view.html',
        controller: 'AquisitionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Aquisitions List'
        }
      })
      .state('aquisitions.create', {
        url: '/create',
        templateUrl: 'modules/aquisitions/client/views/form-aquisition.client.view.html',
        controller: 'AquisitionsController',
        controllerAs: 'vm',
        resolve: {
          aquisitionResolve: newAquisition
        },
        data: {
          roles: ['dataentry', 'superuser'],
          pageTitle: 'Aquisitions Create'
        }
      })
      .state('aquisitions.edit', {
        url: '/:aquisitionId/edit',
        templateUrl: 'modules/aquisitions/client/views/form-aquisition.client.view.html',
        controller: 'AquisitionsController',
        controllerAs: 'vm',
        resolve: {
          aquisitionResolve: getAquisition
        },
        data: {
          roles: ['dataentry', 'admin', 'viewer', 'approver', 'superuser'],
          pageTitle: 'Edit Aquisition {{ aquisitionResolve.name }}'
        }
      })
      .state('aquisitions.view', {
        url: '/:aquisitionId',
        templateUrl: 'modules/aquisitions/client/views/view-aquisition.client.view.html',
        controller: 'AquisitionsController',
        controllerAs: 'vm',
        resolve: {
          aquisitionResolve: getAquisition
        },
        data: {
          pageTitle: 'Aquisition {{ aquisitionResolve.name }}'
        }
      });
  }

  getAquisition.$inject = ['$stateParams', 'AquisitionsService'];

  function getAquisition($stateParams, AquisitionsService) {
    return AquisitionsService.get({
      aquisitionId: $stateParams.aquisitionId
    }).$promise;
  }

  newAquisition.$inject = ['AquisitionsService'];

  function newAquisition(AquisitionsService) {
    return new AquisitionsService();
  }
} ());
