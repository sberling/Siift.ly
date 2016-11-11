(function () {
  'use strict';

  angular
    .module('siifts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Siifts',
      state: 'siifts',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'siifts', {
      title: 'List Siifts',
      state: 'siifts.list',
      roles: ['*']
    });
  }
}());
