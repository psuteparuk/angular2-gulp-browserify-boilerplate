import { Component } from 'angular2/core';
import { CarService } from '../../shared/services/car.service';

@Component({
  selector: 'car-list',
  templateUrl: './cars.html',
  providers: [CarService]
})

export class CarsComponent {
  static get parameters() {
    return [[CarService]];
  }

  constructor(carService) {
    this.cars = [];
    this.carService = carService;
    this.loadCars();
  }

  loadCars() {
    this.carService.getAllCars()
      .map(res => res.json())
      .subscribe(
        data => this.cars = data
      );
  }

  toString(car) {
    return car.year + ',' + car.mileage + ',' + car.price;
  }
}
