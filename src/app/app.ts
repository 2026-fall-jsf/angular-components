import { Component, signal } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';
import { MlyCrustSelection } from './mly-crust-selection/mly-crust-selection';
import { TsteeleAddition } from './tsteele-addition/tsteele-addition';

@Component({
  imports: [
    PizzaToppings,
    MlyCrustSelection,
    
    TsteeleAddition,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-components');
}
