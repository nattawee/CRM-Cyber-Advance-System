(function () {
  'use strict';

  // Properties controller
  angular
    .module('properties')
    .controller('PropertiesController', PropertiesController);

  PropertiesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'propertyResolve', 'BranchesService'];

  function PropertiesController($scope, $state, $window, Authentication, property, BranchesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.property = property;
    vm.general = vm.property;
    BranchesService.query(function (ret) {
      
      if (vm.authentication.user.branch) {
        $scope.branchesService = [];
        ret.forEach(function (brch) {
          if (brch._id.toString() === vm.authentication.user.branch) {
            $scope.branchesService.push(brch);
            vm.general.department = brch;
          }
        });
      } else {
        $scope.branchesService = ret;
      }
    });
    if (vm.property.estexpense && vm.property.estexpense.apprvdate) {
      vm.property.estexpense.apprvdate = new Date(vm.property.estexpense.apprvdate);
    }
    if (vm.property.purchase && vm.property.purchase.apprvdate) {
      vm.property.purchase.apprvdate = new Date(vm.property.purchase.apprvdate);
    }
    if (vm.property.announcement && vm.property.announcement.requestdate) {
      vm.property.announcement.requestdate = new Date(vm.property.announcement.requestdate);
    }
    if (vm.property.announcement && vm.property.announcement.onlinedate) {
      vm.property.announcement.onlinedate = new Date(vm.property.announcement.onlinedate);
    }
    if (vm.property.nacc && vm.property.nacc.naccdocdate) {
      vm.property.nacc.naccdocdate = new Date(vm.property.nacc.naccdocdate);
    }
    if (vm.general.form1 && vm.general.form1.field4.field41) {
      vm.general.form1.field4.field41 = new Date(vm.general.form1.field4.field41);
    }
    if (vm.general.form2 && vm.general.form2.field3.field31) {
      vm.general.form2.field3.field31 = new Date(vm.general.form2.field3.field31);
    }
    if (vm.general.form3 && vm.general.form3.field3.field31) {
      vm.general.form3.field3.field31 = new Date(vm.general.form3.field3.field31);
    }
    if (vm.general.form4 && vm.general.form4.field3.field31) {
      vm.general.form4.field3.field31 = new Date(vm.general.form4.field3.field31);
    }
    if (vm.general.form5 && vm.general.form5.field3.field31) {
      vm.general.form5.field3.field31 = new Date(vm.general.form5.field3.field31);
    }
    if (vm.general.form6 && vm.general.form6.field3.field31) {
      vm.general.form6.field3.field31 = new Date(vm.general.form6.field3.field31);
    }
    if (vm.general.form7 && vm.general.form7.field3.field31) {
      vm.general.form7.field3.field31 = new Date(vm.general.form7.field3.field31);
    }
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.saveToApprove = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.propertyForm');
        return false;
      }
      vm.property.status = 'waiting for approve';
      vm.save(true);
    };

    vm.saveToCompleted = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.propertyForm');
        return false;
      }
      vm.property.status = 'completed2';
      vm.save(true);
    };

    vm.approved = function () {
      if (vm.general.estexpense.amount < 100000) {
        vm.general.status = 'completed1';
      } else {
        vm.general.status = 'approved';
        setNCCdefault();
      }

      vm.save(true);
    };

    function setNCCdefault() {
      /*
                <option value="งานก่อสร้าง">งานก่อสร้าง</option>
                <option value="การจ้างควบคุมงาน">การจ้างควบคุมงาน</option>
                <option value="การจ้างออกแบบ">การจ้างออกแบบ</option>
                <option value="การจ้างที่ปรึกษา">การจ้างที่ปรึกษา</option>
                <option value="การจ้างงานวิจัยหรือเงินสนับสนุนให้ทุนการวิจัย">การจ้างงานวิจัยหรือเงินสนับสนุนให้ทุนการวิจัย</option>
                <option value="การจ้างพัฒนาระบบคอมพิวเตอร์">การจ้างพัฒนาระบบคอมพิวเตอร์</option>
                <option value="การจัดซื้อ/จัดจ้างที่มิใช่งานก่อสร้าง">การจัดซื้อ/จัดจ้างที่มิใช่งานก่อสร้าง</option>
      */
      switch (vm.general.methodtype) {
        case 'งานก่อสร้าง':
          // vm.general.form1.field4.field41 = vm.general.trnsdate;
          // vm.general.form1.field4.field42 = vm.general.estexpense.amount;
          vm.general.form1 = {
            field4: {
              field41: vm.general.estexpense.apprvdate,
              field42: vm.general.estexpense.amount
            }
          };
          break;
        case 'การจ้างควบคุมงาน':
          // vm.general.form2.field3.field31 = vm.general.trnsdate;
          // vm.general.form2.field3.field32 = vm.general.estexpense.amount;
          vm.general.form2 = {
            field3: {
              field31: vm.general.estexpense.apprvdate,
              field32: vm.general.estexpense.amount
            }
          };
          break;
        case 'การจ้างออกแบบ':
          vm.general.form3 = {
            field3: {
              field31: vm.general.estexpense.apprvdate,
              field32: vm.general.estexpense.amount
            }
          };
          break;
        case 'การจ้างที่ปรึกษา':
          vm.general.form2 = {
            field4: {
              field31: vm.general.estexpense.apprvdate,
              field32: vm.general.estexpense.amount
            }
          };
          break;
        case 'การจ้างงานวิจัยหรือเงินสนับสนุนให้ทุนการวิจัย':
          vm.general.form2 = {
            field5: {
              field31: vm.general.estexpense.apprvdate,
              field32: vm.general.estexpense.amount
            }
          };
          break;
        case 'การจ้างพัฒนาระบบคอมพิวเตอร์':
          vm.general.form6 = {
            field3: {
              field31: vm.general.estexpense.apprvdate,
              field32: vm.general.estexpense.amount
            }
          };
          break;
        case 'การจัดซื้อ/จัดจ้างที่มิใช่งานก่อสร้าง':
          vm.general.form7 = {
            field3: {
              field31: vm.general.estexpense.apprvdate,
              field32: vm.general.estexpense.amount
            }
          };
          break;
        default:

      }
    }

    vm.rejected = function () {

      vm.property.status = 'rejected';
      vm.save(true);
    };

    // Remove existing Property
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.property.$remove($state.go('properties.list'));
      }
    }

    // Save Property
    function save(isValid) {
      if (vm.property.status && vm.property.status !=='draft' && vm.property.status !=='approved') {
        if (!isValid) {
          angular.element('input.ng-invalid').first().focus();
          $scope.$broadcast('show-errors-check-validity', 'vm.form.propertyForm');
          return false;
        }
      }


      // TODO: move create/update logic to service
      if (vm.property._id) {
        vm.property.$update(successCallback, errorCallback);
      } else {
        vm.property.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('properties.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
