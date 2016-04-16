angular.module('project8').controller('CarController', function($scope, carService) {
  $scope.cars = [];

  $scope.loadCars = function() {
    carService.getAllCars().then(function(response) {
      $scope.cars = response.data;
    });
  };

  $scope.toString = function(car) {
    return car.car_model.make + ',' + car.car_model.model + ',' + car.car_model.submodel + ',' + car.mileage + ',' + car.price;
  };

  $scope.loadCars();
});
