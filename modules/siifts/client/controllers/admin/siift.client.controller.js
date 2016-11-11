(function () {
  'use strict';

  angular
    .module('siifts.admin')
    .controller('SiiftsAdminController', SiiftsAdminController);

  SiiftsAdminController.$inject = ['$scope', '$state', '$window', 'siiftResolve', 'Authentication'];

  function SiiftsAdminController($scope, $state, $window, siift, Authentication) {
    var vm = this;

    vm.siift = siift;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Siift
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.siift.$remove(function() {
          $state.go('admin.siifts.list');
        });
      }
    }

    // Save Siift
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.siiftForm');
        return false;
      }

      // Create a new siift, or update the current instance
      vm.siift.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.siifts.list'); // should we send the User to the list or the updated Siift's view?
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
