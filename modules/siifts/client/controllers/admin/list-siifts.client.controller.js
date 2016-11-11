(function () {
  'use strict';

  angular
    .module('siifts.admin')
    .controller('SiiftsAdminListController', SiiftsAdminListController);

  SiiftsAdminListController.$inject = ['SiiftsService'];

  function SiiftsAdminListController(SiiftsService) {
    var vm = this;

    vm.siifts = SiiftsService.query();
  }
}());
