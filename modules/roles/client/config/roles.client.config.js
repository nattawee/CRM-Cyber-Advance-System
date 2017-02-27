(function () {
  'use strict';

  angular
    .module('roles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Roles',
      state: 'roles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'roles', {
      title: 'List Roles',
      state: 'roles.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'roles', {
      title: 'Create Role',
      state: 'roles.create',
      roles: ['user']
    });
  }
}());
