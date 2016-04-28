import { Component } from 'angular2/core';
import { CarsComponent } from '../cars/cars.component';

@Component({
  selector: 'carmana-root',
  templateUrl: './root.html',
  directives: [CarsComponent]
})

export class RootComponent {}
