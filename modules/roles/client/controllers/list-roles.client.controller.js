(function () {
  'use strict';

  angular
    .module('roles')
    .controller('RolesListController', RolesListController);

  RolesListController.$inject = ['RolesService', 'Authentication'];

  function RolesListController(RolesService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    vm.roles = RolesService.query();
  }
} ());
