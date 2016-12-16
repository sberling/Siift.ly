(function () {
  'use strict';

  angular
    .module('siifts.services')
    .factory('SiiftsService', SiiftsService);

  SiiftsService.$inject = ['$resource', '$filter'];

  function SiiftsService($resource, $filter) {
    var Siift = $resource('api/siifts/:siiftId', {
      siiftId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    function urlget(yourUrl) {
      var Httpreq = new XMLHttpRequest(); // a new request
      Httpreq.open('GET', yourUrl, false);
      Httpreq.send(null);
      return Httpreq.responseText;
    }

    function getLocation(siift) {
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

      function handleError(error) {
        // Log error
        console.log(error);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            siift.latitude = position.latitude;
            siift.longitude = position.longitude;
            siift.$update(onSuccess, onError);
          }
        );
      } else {
        console.log('location not implemented');
      }
    }

    angular.extend(Siift.prototype, {
      createOrUpdate: function () {
        var siift = this;
        var day_of_week = $filter('date')(Date.now(), 'EEEE');
        siift.tags.push(day_of_week.toLowerCase());
        siift.tags.push($filter('timeOfDay')(Date.now()));
        var weather_data = JSON.parse(urlget('http://api.wunderground.com/api/4dc1221e088aa9f8/conditions/q/autoip.json'));
        siift.tags.push(weather_data.current_observation.weather.toLowerCase());
        var ip_data = JSON.parse(urlget('http://freegeoip.net/json/'));
        siift.tags.push(ip_data.city.toLowerCase());
        siift.tags.push(ip_data.region_name.toLowerCase());

        getLocation(siift);
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
