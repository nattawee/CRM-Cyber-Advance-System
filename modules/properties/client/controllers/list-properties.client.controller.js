(function () {
  'use strict';

  angular
    .module('properties')
    .controller('PropertiesListController', PropertiesListController);

  PropertiesListController.$inject = ['PropertiesService', 'Authentication'];

  function PropertiesListController(PropertiesService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.properties = PropertiesService.query();
    vm.generals = vm.properties;

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
      vm.generalss = PropertiesService.query(function (generals) {
        vm.dataList = [];
        generals.forEach(function (general) {
          if (general.department) {

            if (general.department._id === vm.authentication.user.branch) {
              vm.selectedStatus = status || 'draft';
              if (vm.selectedStatus === general.status) {
                var data = {
                  propertyid: general.propertyid ? general.propertyid : '',
                  documentno: general.documentno ? general.documentno : '',
                  name: general.name ? general.name : '',
                  subdistrict: general.location.subdistrict ? general.location.subdistrict : '',
                  district: general.location.district ? general.location.district : '',
                  province: general.location.province ? general.location.province : '',
                  propertydes: general.propertydes ? general.propertydes : '',
                  department: general.department.name ? general.department.name : '',
                  processtype: general.processtype ? general.processtype : '',
                  methodtype: general.methodtype ? general.methodtype : '',
                  amount: general.estexpense.amount ? general.estexpense.amount : 0,
                  apprvdate: general.estexpense.apprvdate ? new Date(general.estexpense.apprvdate).toLocaleDateString() : '',
                  approver: general.estexpense.approver ? general.estexpense.approver : '',
                  f1_field11: general.form1 ? general.form1.field1.field11 : '',
                  f1_field12: general.form1 ? general.form1.field1.field12 : '',
                  f1_field2: general.form1 ? general.form1.field2 : 0,
                  f1_field3: general.form1 ? general.form1.field3 : '',
                  f1_field41: general.form1 ? new Date(general.form1.field4.field41).toLocaleDateString() : '',
                  f1_field42: general.form1 ? general.form1.field4.field42 : 0,
                  f1_field50: general.form1 ? general.form1.field5.field50 : '',
                  f1_field51: general.form1 ? general.form1.field5.field51 : '',
                  f1_field52: general.form1 ? general.form1.field5.field52 : '',
                  f1_field53: general.form1 ? general.form1.field5.field53 : '',
                  f1_field54: general.form1 ? general.form1.field5.field54 : '',
                  f1_field6: general.form1 ? general.form1.field6 : '',
                  f2_field11: general.form2 ? general.form2.field1.field11 : '',
                  f2_field12: general.form2 ? general.form2.field1.field12 : '',
                  f2_field2: general.form2 ? general.form2.field2 : 0,
                  f2_field31: general.form2 ? new Date(general.form2.field3.field31).toLocaleDateString() : '',
                  f2_field32: general.form2 ? general.form2.field3.field32 : 0,
                  f2_field41: general.form2 ? general.form2.field4.field41 : 0,
                  f2_field42: general.form2 ? general.form2.field4.field42 : '',
                  f2_field43: general.form2 ? general.form2.field4.field43 : '',
                  f2_field44: general.form2 ? general.form2.field4.field44 : '',
                  f2_field5: general.form2 ? general.form2.field5 : 0,
                  f2_field6: general.form2 ? general.form2.field6 : 0,
                  f2_field7: general.form2 ? general.form2.field7 : '',
                  f2_field8: general.form2 ? general.form2.field8 : '',
                  f3_field11: general.form3 ? general.form3.field1.field11 : '',
                  f3_field12: general.form3 ? general.form3.field1.field12 : '',
                  f3_field2: general.form3 ? general.form3.field2 : 0,
                  f3_field31: general.form3 ? new Date(general.form3.field3.field31).toLocaleDateString() : '',
                  f3_field32: general.form3 ? general.form3.field3.field32 : 0,
                  f3_field41: general.form3 ? general.form3.field3.field41 : 0,
                  f3_field42: general.form3 ? general.form3.field3.field42 : '',
                  f3_field43: general.form3 ? general.form3.field3.field43 : '',
                  f3_field44: general.form3 ? general.form3.field3.field44 : '',
                  f3_field5: general.form3 ? general.form3.field5 : 0,
                  f3_field6: general.form3 ? general.form3.field6 : 0,
                  f3_field7: general.form3 ? general.form3.field7 : 0,
                  f3_field8: general.form3 ? general.form3.field8 : '',
                  f4_field11: general.form4 ? general.form4.field1.field11 : '',
                  f4_field12: general.form4 ? general.form4.field1.field12 : '',
                  f4_field2: general.form4 ? general.form4.field2 : 0,
                  f4_field31: general.form4 ? new Date(general.form4.field3.field31).toLocaleDateString() : '',
                  f4_field32: general.form4 ? general.form4.field3.field32 : 0,
                  f4_field41: general.form4 ? general.form4.field4.field41 : 0,
                  f4_field42: general.form4 ? general.form4.field4.field42 : '',
                  f4_field43: general.form4 ? general.form4.field4.field43 : '',
                  f4_field44: general.form4 ? general.form4.field4.field44 : '',
                  f4_field5: general.form4 ? general.form4.field5 : 0,
                  f4_field6: general.form4 ? general.form4.field6 : 0,
                  f4_field7: general.form4 ? general.form4.field7 : 0,
                  f4_field8: general.form4 ? general.form4.field8 : '',
                  f4_field9: general.form4 ? general.form4.field9 : '',
                  f5_field11: general.form5 ? general.form5.field1.field11 : '',
                  f5_field12: general.form5 ? general.form5.field1.field12 : '',
                  f5_field2: general.form5 ? general.form5.field2 : 0,
                  f5_field31: general.form5 ? new Date(general.form5.field3.field31).toLocaleDateString() : '',
                  f5_field32: general.form5 ? general.form5.field3.field32 : 0,
                  f5_field41: general.form5 ? general.form5.field4.field41 : 0,
                  f5_field42: general.form5 ? general.form5.field4.field42 : '',
                  f5_field43: general.form5 ? general.form5.field4.field43 : '',
                  f5_field44: general.form5 ? general.form5.field4.field44 : 0,
                  f5_field5: general.form5 ? general.form5.field5 : 0,
                  f5_field6: general.form5 ? general.form5.field6 : 0,
                  f5_field7: general.form5 ? general.form5.field7 : 0,
                  f5_field8: general.form5 ? general.form5.field8 : 0,
                  f5_field91: general.form5 ? general.form5.field9.field91 : 0,
                  f5_field92: general.form5 ? general.form5.field9.field92 : 0,
                  f5_field10: general.form5 ? general.form5.field10 : 0,
                  f5_field511: general.form5 ? general.form5.field11 : '',
                  f5_field512: general.form5 ? general.form5.field12 : 0,
                  f6_field11: general.form6 ? new Date(general.form6.field1.field11).toLocaleDateString() : '',
                  f6_field12: general.form6 ? general.form6.field1.field12 : '',
                  f6_field2: general.form6 ? general.form6.field2 : 0,
                  f6_field31: general.form6 ? general.form6.field3.field31 : '',
                  f6_field32: general.form6 ? general.form6.field3.field32 : 0,
                  f6_field4: general.form6 ? general.form6.field4 : 0,
                  f6_field5: general.form6 ? general.form6.field5 : 0,
                  f6_field6: general.form6 ? general.form6.field6 : 0,
                  f6_field7: general.form6 ? general.form6.field7 : 0,
                  f6_field8: general.form6 ? general.form6.field8 : '',
                  f6_field9: general.form6 ? general.form6.field9 : '',
                  f7_field11: general.form7 ? general.form7.field1.field11 : '',
                  f7_field12: general.form7 ? general.form7.field1.field12 : '',
                  f7_field2: general.form7 ? general.form7.field2 : 0,
                  f7_field31: general.form7 ? new Date(general.form7.field3.field31).toLocaleDateString() : '',
                  f7_field32: general.form7 ? general.form7.field3.field32 : 0,
                  f7_field33: general.form7 ? general.form7.field3.field33 : 0,
                  f7_field41: general.form7 ? general.form7.field4.field41 : '',
                  f7_field42: general.form7 ? general.form7.field4.field42 : '',
                  f7_field43: general.form7 ? general.form7.field4.field43 : 'ทดสอบ',
                  f7_field5: general.form7 ? general.form7.field5 : 0,
                  status: general.status ? general.status : '',
                  requestdate: general.announcement ? new Date(general.announcement.requestdate).toLocaleDateString() : '',
                  onlinedate: general.announcement ? new Date(general.announcement.onlinedate).toLocaleDateString() : '',
                  reference: general.announcement ? general.announcement.reference : '',
                  Pamount: general.purchase ? general.purchase.amount : 0,
                  Papprvdate: general.purchase ? new Date(general.purchase.apprvdate).toLocaleDateString() : '',
                  Papprover: general.purchase ? general.purchase.approver : '',
                  supplier: general.supplier ? general.supplier : '',
                  refno: general.refno ? general.refno : '',
                  naccdocdate: general.nacc ? new Date(general.nacc.naccdocdate).toLocaleDateString() : '',
                  naccdocno: general.nacc ? general.nacc.naccdocno : '',
                  approved: general.approved ? new Date(general.approved).toLocaleDateString() : '',
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
    vm.tabs = [{
      renovate: 0,
      name: 'แบบร่าง',
      status: 'draft',
      uriref: 'properties.edit({ propertyId: property._id })'
    },
      {
        renovate: 1,
        name: 'รออนุมัติ',
        status: 'waiting for approve',
        uriref: 'properties.view({ propertyId: property._id })'
      },
      {
        renovate: 2,
        name: 'อนุมัติ',
        status: 'approved',
        uriref: 'properties.view({ propertyId: property._id })'
      },
      {
        renovate: 3,
        name: 'รอแก้ไข',
        status: 'rejected',
        uriref: 'properties.edit({ propertyId: property._id })'
      },
      {
        renovate: 4,
        name: 'เสร็จสมบูรณ์ 1',
        status: 'completed1',
        uriref: 'properties.view({ propertyId: property._id })'
      },
      {
        renovate: 5,
        name: 'เสร็จสมบูรณ์ 2',
        status: 'completed2',
        uriref: 'properties.view({ propertyId: property._id })'
      }];
  }
} ());
