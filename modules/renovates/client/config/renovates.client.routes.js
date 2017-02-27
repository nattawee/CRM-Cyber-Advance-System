(function () {
  'use strict';

  angular
    .module('renovates')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('renovates', {
        abstract: true,
        url: '/renovates',
        template: '<ui-view/>'
      })
      .state('renovates.list', {
        url: '',
        templateUrl: 'modules/renovates/client/views/list-renovates.client.view.html',
        controller: 'RenovatesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Renovates List'
        }
      })
      .state('renovates.create', {
        url: '/create',
        templateUrl: 'modules/renovates/client/views/form-renovate.client.view.html',
        controller: 'RenovatesController',
        controllerAs: 'vm',
        resolve: {
          renovateResolve: newRenovate
        },
        data: {
          roles: ['dataentry', 'admin', 'superuser'],
          pageTitle: 'Renovates Create'
        }
      })
      .state('renovates.edit', {
        url: '/:renovateId/edit',
        templateUrl: 'modules/renovates/client/views/form-renovate.client.view.html',
        controller: 'RenovatesController',
        controllerAs: 'vm',
        resolve: {
          renovateResolve: getRenovate
        },
        data: {
          roles: ['user', 'admin','viewer','approver','dataentry', 'superuser'],
          pageTitle: 'Edit Renovate {{ renovateResolve.name }}'
        }
      })
      .state('renovates.view', {
        url: '/:renovateId',
        templateUrl: 'modules/renovates/client/views/view-renovate.client.view.html',
        controller: 'RenovatesController',
        controllerAs: 'vm',
        resolve: {
          renovateResolve: getRenovate
        },
        data: {
          pageTitle: 'Renovate {{ renovateResolve.name }}'
        }
      });
  }

  getRenovate.$inject = ['$stateParams', 'RenovatesService'];

  function getRenovate($stateParams, RenovatesService) {
    return RenovatesService.get({
      renovateId: $stateParams.renovateId
    }).$promise;
  }

  newRenovate.$inject = ['RenovatesService'];

  function newRenovate(RenovatesService) {
    return new RenovatesService();
  }
}());
