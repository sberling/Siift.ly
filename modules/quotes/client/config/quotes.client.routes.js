(function () {
  'use strict';

  angular
    .module('quotes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('quote', {
        abstract: true,
        url: '/quotes',
        template: '<ui-view/>'
      })
      .state('quotes.view', {
        url: '/getquote',
        templateUrl: 'modules/siifts/client/views/view-siift.client.view.html',
        controller: 'QuotesController',
        controllerAs: 'vm',
        resolve: {
          quoteResolve: getQuote
        },
        data: {
          pageTitle: 'Siift {{ siiftResolve.title }}'
        }
      });
  }

  getQuote.$inject = ['$stateParams', 'QuotesService'];

  function getQuote($stateParams, QuotesService) {
    return QuotesService.get({
      quoteId: $stateParams.quoteId
    }).$promise;
  }
}());
