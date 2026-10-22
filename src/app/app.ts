import { Component, signal } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';
import { MlyCrustSelection } from './mly-crust-selection/mly-crust-selection';

@Component({
  imports: [
    PizzaToppings,
    MlyCrustSelection,
    
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-components');
}
