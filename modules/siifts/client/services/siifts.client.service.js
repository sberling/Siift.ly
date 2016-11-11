(function () {
  'use strict';

  angular
    .module('siifts.services')
    .factory('SiiftsService', SiiftsService);

  SiiftsService.$inject = ['$resource'];

  function SiiftsService($resource) {
    var Siift = $resource('api/siifts/:siiftId', {
      siiftId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Siift.prototype, {
      createOrUpdate: function () {
        var siift = this;
        return createOrUpdate(siift);
      }
    });

    return Siift;

    function createOrUpdate(siift) {
      if (siift._id) {
        return siift.$update(onSuccess, onError);
      } else {
        return siift.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(siift) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      console.log(error);
    }
  }
}());
