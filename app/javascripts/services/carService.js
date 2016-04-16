angular.module('project8').factory('carService', function($http) {
  return {
    getAllCars: function() {
      return $http.get('/api/cars');
    },

    getCar: function(id) {
      return $http.get('/api/car' + id);
    }
  };
});
