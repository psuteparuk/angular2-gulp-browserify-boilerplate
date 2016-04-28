import { Injectable } from 'angular2/core';
import 'rxjs/Rx';
import { Http } from 'angular2/http';

@Injectable()
export class CarService {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;
  }

  getAllCars() {
    return this.http.get('/api/cars');
  }

  getCar(id) {
    return this.http.get(`/api/car/${id}`);
  }
};
