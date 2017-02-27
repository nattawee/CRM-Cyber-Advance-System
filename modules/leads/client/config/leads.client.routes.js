(function () {
  'use strict';

  angular
    .module('leads')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('leads', {
        abstract: true,
        url: '/leads',
        template: '<ui-view/>'
      })
      .state('leads.list', {
        url: '',
        templateUrl: 'modules/leads/client/views/list-leads.client.view.html',
        controller: 'LeadsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Leads List'
        }
      })
      .state('leads.create', {
        url: '/create',
        templateUrl: 'modules/leads/client/views/form-lead.client.view.html',
        controller: 'LeadsController',
        controllerAs: 'vm',
        resolve: {
          leadResolve: newLead
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Leads Create'
        }
      })
      .state('leads.edit', {
        url: '/:leadId/edit',
        templateUrl: 'modules/leads/client/views/form-lead.client.view.html',
        controller: 'LeadsController',
        controllerAs: 'vm',
        resolve: {
          leadResolve: getLead
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Lead {{ leadResolve.name }}'
        }
      })
      .state('leads.view', {
        url: '/:leadId',
        templateUrl: 'modules/leads/client/views/view-lead.client.view.html',
        controller: 'LeadsController',
        controllerAs: 'vm',
        resolve: {
          leadResolve: getLead
        },
        data: {
          pageTitle: 'Lead {{ leadResolve.name }}'
        }
      });
  }

  getLead.$inject = ['$stateParams', 'LeadsService'];

  function getLead($stateParams, LeadsService) {
    return LeadsService.get({
      leadId: $stateParams.leadId
    }).$promise;
  }

  newLead.$inject = ['LeadsService'];

  function newLead(LeadsService) {
    return new LeadsService();
  }
}());
