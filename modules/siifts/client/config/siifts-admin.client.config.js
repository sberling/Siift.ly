(function () {
  'use strict';

  // Configuring the Siifts Admin module
  angular
    .module('siifts.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Siifts',
      state: 'admin.siifts.list'
    });
  }
}());
