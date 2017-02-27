(function () {
  'use strict';

  angular
    .module('aquisitions')
    .controller('AquisitionsListController', AquisitionsListController);

  AquisitionsListController.$inject = ['AquisitionsService', 'Authentication'];

  function AquisitionsListController(AquisitionsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.aquisitions = AquisitionsService.query();
    vm.status = function (status) {
      if (status) {
        vm.selectedStatus = status.status;
      } else {
        vm.selectedStatus = 'draft';
      }
      vm.readGenerals(vm.selectedStatus);
    };
    // vm.status();
    // vm.tabstatus = function (status) {
    vm.readGenerals = function (status) {
      vm.generals = AquisitionsService.query(function (generals) {
        vm.dataList = [];
        generals.forEach(function (general) {
          if (general) {

            //   if (general.department._id === vm.authentication.user.branch) {
            vm.selectedStatus = status || 'draft';
            if (vm.selectedStatus === general.status) {
              var data = {
                startdate: general ? new Date(general.startdate).toLocaleDateString() : '',
                relations: general ? general.relations : '',
                descriptionlist: general ? general.descriptionlist : '',
                descriptionproduct: general ? general.descriptionproduct : '',
                caculation: general ? general.caculation : '',
                benefit: general ? general.benefit : '',
                comment: general ? general.comment : '',
                manipulator: general ? general.manipulator : '',
                approvers: general ? general.approvers : '',
                status: general ? general.status : '',
                f1assetssum: general.form1 ? general.form1.nta.assetssum : 0,
                f1assetsintangible: general.form1 ? general.form1.nta.assetsintangible : 0,
                f1debtssum: general.form1 ? general.form1.nta.debtssum : 0,
                f1shareholder: general.form1 ? general.form1.nta.shareholder : 0,
                f1ntasum: general.form1 ? general.form1.nta.ntasum : 0,
                f1acqodis: general.form1 ? general.form1.acqodis : 0,
                f1ntalisted: general.form1 ? general.form1.ntalisted : 0,
                f2netoperating: general.form2 ? general.form2.netoperating : 0,
                f2ratio: general.form2 ? general.form2.ratio : 0,
                f2netcompany: general.form2 ? general.form2.netcompany : 0,
                f3amount: general.form3 ? general.form3.amount : 0,
                f3assetscompany: general.form3 ? general.form3.assetscompany : 0,
                f4sharespay: general.form4 ? general.form4.sharespay : 0,
                f4sharespaycompany: general.form4 ? general.form4.sharespaycompany : 0,

              };
              // if (general.department.name === vm.authentication.department){
              vm.dataList.push(data);
            }
            // }
            //   }
          }

        });
      });
    };
    vm.tabs = [{
      renovate: 0,
      name: 'แบบร่าง',
      status: 'draft',
      uriref: 'aquisitions.edit({ aquisitionId: aquisition._id })'
    },
      {
        renovate: 1,
        name: 'รออนุมัติ',
        status: 'waiting for approve',
        uriref: 'aquisitions.view({ aquisitionId: aquisition._id })'
      },
      {
        renovate: 2,
        name: 'อนุมัติ',
        status: 'complete',
        uriref: 'aquisitions.view({ aquisitionId: aquisition._id })'
      }];
  }
} ());
