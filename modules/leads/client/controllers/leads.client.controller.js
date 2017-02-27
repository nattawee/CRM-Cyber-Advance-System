(function () {
  'use strict';

  // Leads controller
  angular
    .module('leads')
    .controller('LeadsController', LeadsController);

  LeadsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'leadResolve'];

  function LeadsController ($scope, $state, $window, Authentication, lead) {
    var vm = this;

    vm.authentication = Authentication;
    vm.lead = lead;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Lead
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.lead.$remove($state.go('leads.list'));
      }
    }

    // Save Lead
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.leadForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.lead._id) {
        vm.lead.$update(successCallback, errorCallback);
      } else {
        vm.lead.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('leads.view', {
          leadId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
