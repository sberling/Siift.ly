(function () {
  'use strict';

  angular
    .module('siifts.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('siifts', {
        abstract: true,
        url: '/siifts',
        template: '<ui-view/>'
      })
      .state('siifts.list', {
        url: '',
        templateUrl: 'modules/siifts/client/views/list-siifts.client.view.html',
        controller: 'SiiftsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Siifts List'
        }
      })
      .state('siifts.view', {
        url: '/:siiftId',
        templateUrl: 'modules/siifts/client/views/view-siift.client.view.html',
        controller: 'SiiftsController',
        controllerAs: 'vm',
        resolve: {
          siiftResolve: getSiift
        },
        data: {
          pageTitle: 'Siift {{ siiftResolve.title }}'
        }
      });
  }

  getSiift.$inject = ['$stateParams', 'SiiftsService'];

  function getSiift($stateParams, SiiftsService) {
    return SiiftsService.get({
      siiftId: $stateParams.siiftId
    }).$promise;
  }
}());
