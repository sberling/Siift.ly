(function () {
  'use strict';

  angular
    .module('siifts.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.siifts', {
        abstract: true,
        url: '/siifts',
        template: '<ui-view/>'
      })
      .state('admin.siifts.list', {
        url: '',
        templateUrl: 'modules/siifts/client/views/list-siifts.client.view.html',
        controller: 'SiiftsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      })
      .state('admin.siifts.create', {
        url: '/create',
        templateUrl: 'modules/siifts/client/views/form-siift.client.view.html',
        controller: 'SiiftsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        },
        resolve: {
          siiftResolve: newSiift
        }
      })
      .state('admin.siifts.edit', {
        url: '/:siiftId/edit',
        templateUrl: 'modules/siifts/client/views/form-siift.client.view.html',
        controller: 'SiiftsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        },
        resolve: {
          siiftResolve: getSiift
        }
      });
  }

  getSiift.$inject = ['$stateParams', 'SiiftsService'];

  function getSiift($stateParams, SiiftsService) {
    return SiiftsService.get({
      siiftId: $stateParams.siiftId
    }).$promise;
  }

  newSiift.$inject = ['SiiftsService'];

  function newSiift(SiiftsService) {
    return new SiiftsService();
  }
}());
