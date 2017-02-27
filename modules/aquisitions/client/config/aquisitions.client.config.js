(function () {
  'use strict';

  angular
    .module('aquisitions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Aquisitions',
      state: 'aquisitions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'aquisitions', {
      title: 'List Aquisitions',
      state: 'aquisitions.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'aquisitions', {
      title: 'Create Aquisition',
      state: 'aquisitions.create',
      roles: ['user']
    });
  }
}());
