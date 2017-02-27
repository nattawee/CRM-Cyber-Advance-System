(function () {
  'use strict';

  angular
    .module('leads')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Leads',
      state: 'leads',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'leads', {
      title: 'List Leads',
      state: 'leads.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'leads', {
      title: 'Create Lead',
      state: 'leads.create',
      roles: ['user']
    });
  }
}());
