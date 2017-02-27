(function () {
  'use strict';

  angular
    .module('generals')
    .controller('GeneralsListController', GeneralsListController);

  GeneralsListController.$inject = ['GeneralsService', 'Authentication'];

  function GeneralsListController(GeneralsService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
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
      vm.generals = GeneralsService.query(function (generals) {
        vm.dataList = [];
        generals.forEach(function (general) {
          if (general.department) {

            if (general.department._id === vm.authentication.user.branch) {
              vm.selectedStatus = status || 'draft';
              if (vm.selectedStatus === general.status) {
                var data = {
                  date: new Date(general.trnsdate).toLocaleDateString(),
                  item: general.itemdesc,
                  brunch: general.department.name,
                  owner: general.owner,
                  docno: general.docno,
                  amount: general.estexpense.amount,
                  apprvdate: general.estexpense ? new Date(general.estexpense.apprvdate).toLocaleDateString() : '',
                  approver: general.estexpense.approver,
                  processtype: general.processtype,
                  methodtype: general.methodtype,
                  requestdate: general.announcement ? new Date(general.announcement.requestdate).toLocaleDateString() : '',
                  onlinedate: general.announcement ? new Date(general.announcement.onlinedate).toLocaleDateString() : '',
                  reference: general.announcement ? general.announcement.reference : '',
                  pamount: general.purchase.amount,
                  papprvdate: general.purchase.apprvdate ? new Date(general.purchase.apprvdate).toLocaleDateString() : '',
                  papprover: general.purchase.approver,
                  supplier: general.supplier,
                  refno: general.refno,
                  naccdocdate: general.nacc ? new Date(general.nacc.naccdocdate).toLocaleDateString() : '',
                  naccdocno: general.nacc ? general.nacc.naccdocno : ''
                };
                // if (general.department.name === vm.authentication.department){
                vm.dataList.push(data);
              }
              // }
            }
          }

        });
      });
    };

    // }

    // vm.ge = JSON.stringify(vm.dataList);
    // vm.dataList = [
    //   {
    //     id: 1,
    //     name: 'github',
    //     price: '200$',
    //     publisher: {
    //       name: 'dtagdev'
    //     }
    //   },
    //   {
    //     id: 2,
    //     name: 'google',
    //     price: '300$',
    //     publisher: {
    //       name: 'dtagvn'
    //     }
    //   }
    // ];
    vm.tabs = [{
      renovate: 0,
      name: 'แบบร่าง',
      status: 'draft',
      uriref: 'generals.edit({ generalId: general._id })'
    },
      {
        renovate: 1,
        name: 'รออนุมัติ',
        status: 'waiting for approve',
        uriref: 'generals.view({ generalId: general._id })'
      },
      {
        renovate: 2,
        name: 'อนุมัติ',
        status: 'approved',
        uriref: 'generals.view({ generalId: general._id })'
      },
      {
        renovate: 3,
        name: 'รอแก้ไข',
        status: 'rejected',
        uriref: 'generals.edit({ generalId: general._id })'
      },
      {
        renovate: 4,
        name: 'เสร็จสมบูรณ์ 1',
        status: 'completed1',
        uriref: 'generals.view({ generalId: general._id })'
      },
      {
        renovate: 5,
        name: 'เสร็จสมบูรณ์ 2',
        status: 'completed2',
        uriref: 'generals.view({ generalId: general._id })'
      }];



  }
} ());
