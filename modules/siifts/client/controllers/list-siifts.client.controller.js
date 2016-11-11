(function () {
  'use strict';

  angular
    .module('siifts')
    .controller('SiiftsListController', SiiftsListController);

  SiiftsListController.$inject = ['SiiftsService'];

  function SiiftsListController(SiiftsService) {
    var vm = this;

    vm.siifts = SiiftsService.query();
  }
}());
