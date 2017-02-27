(function () {
  'use strict';

  // Aquisitions controller
  angular
    .module('aquisitions')
    .controller('AquisitionsController', AquisitionsController);

  AquisitionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'aquisitionResolve'];

  function AquisitionsController($scope, $state, $window, Authentication, aquisition) {
    var vm = this;

    vm.authentication = Authentication;
    vm.aquisition = aquisition;
    vm.aquisition.startdate = new Date(vm.aquisition.startdate);
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    $scope.step = function (step) {
      if (step === 1) {
        $scope.step1 = 'active';
        $scope.step2 = null;
        $scope.step3 = null;
        $scope.step4 = null;
        $scope.step5 = null;
      } else if (step === 2) {
        $scope.step1 = 'active';
        $scope.step2 = 'active';
        $scope.step3 = null;
        $scope.step4 = null;
        $scope.step5 = null;
      } else if (step === 3) {
        $scope.step1 = 'active';
        $scope.step2 = 'active';
        $scope.step3 = 'active';
        $scope.step4 = null;
        $scope.step5 = null;
      } else if (step === 4) {
        $scope.step1 = 'active';
        $scope.step2 = 'active';
        $scope.step3 = 'active';
        $scope.step4 = 'active';
        $scope.step5 = null;
      } else if (step === 5) {
        $scope.step1 = 'active';
        $scope.step2 = 'active';
        $scope.step3 = 'active';
        $scope.step4 = 'active';
        $scope.step5 = 'active';
      }
    };
    vm.saveToApprove = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.aquisitionForm');
        return false;
      }
      vm.aquisition.status = 'waiting for approve';
      vm.save(true);
    };
    vm.saveToDraft = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.aquisitionForm');
        return false;
      }
      vm.aquisition.status = 'draft';
      vm.save(true);
    };

    vm.saveToComplete = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.aquisitionForm');
        return false;
      }
      vm.aquisition.status = 'complete';
      vm.save(true);
    };
    // Remove existing Aquisition
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.aquisition.$remove($state.go('aquisitions.list'));
      }
    }

    // Save Aquisition
    function save(isValid) {
      console.log(vm.aquisition);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.aquisitionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.aquisition._id) {
        vm.aquisition.$update(successCallback, errorCallback);
      } else {
        vm.aquisition.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('aquisitions.list', {
          aquisitionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
} ());
