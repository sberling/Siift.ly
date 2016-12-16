(function () {
  'use strict';

  angular
    .module('siifts')
    .filter('timeOfDay', timeOfDay);

  timeOfDay.$inject = ['$filter'];

  function timeOfDay($filter) {
    return function (input) {
      var hour = $filter('date')(input, 'H');
      if (hour < 5) {
        return 'late night';
      } else if (hour >= 5 && hour <= 8) {
        return 'early morning';
      } else if (hour > 8 && hour < 12) {
        return 'morning';
      } else if (hour >= 12 && hour <= 17) {
        return 'afternoon';
      } else if (hour > 17 && hour <= 24) {
        return 'evening';
      } else {
        return 'Im not sure what time it is!';
      }
    };
  }
}());
