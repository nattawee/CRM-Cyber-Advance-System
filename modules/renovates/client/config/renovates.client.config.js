(function () {
  'use strict';

  angular
    .module('renovates')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Renovates',
      state: 'renovates',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'renovates', {
      title: 'List Renovates',
      state: 'renovates.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'renovates', {
      title: 'Create Renovate',
      state: 'renovates.create',
      roles: ['user']
    });
  }
}());
