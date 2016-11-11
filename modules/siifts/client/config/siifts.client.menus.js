(function () {
  'use strict';

  angular
    .module('siifts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Siifts',
      state: 'siifts.list',
      roles: ['user']
    });
  }
}());
