import { Component, signal } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';
import { TsteeleD6s } from './tsteele-d6s/tsteele-d6s';

@Component({
  imports: [
    PizzaToppings,
    TsteeleD6s,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-components');
}
