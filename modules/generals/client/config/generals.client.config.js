(function () {
  'use strict';

  angular
    .module('generals')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Generals',
      state: 'generals',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'generals', {
      title: 'List Generals',
      state: 'generals.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'generals', {
      title: 'Create General',
      state: 'generals.create',
      roles: ['user']
    });
  }
}());
