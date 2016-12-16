(function () {
  'use strict';

  angular
    .module('siifts')
    .controller('SiiftsController', SiiftsController);

  SiiftsController.$inject = ['$scope', 'siiftResolve', 'Authentication'];

  function SiiftsController($scope, siift, Authentication) {
    var vm = this;
    vm.siift = siift;
    vm.authentication = Authentication;
    vm.error = null;

  }
}());
