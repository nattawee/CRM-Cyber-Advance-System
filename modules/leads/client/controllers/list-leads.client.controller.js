(function () {
  'use strict';

  angular
    .module('leads')
    .controller('LeadsListController', LeadsListController);

  LeadsListController.$inject = ['LeadsService'];

  function LeadsListController(LeadsService) {
    var vm = this;

    vm.leads = LeadsService.query();
  }
}());
