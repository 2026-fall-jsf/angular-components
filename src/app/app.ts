import { Component, signal } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';
import { EgaritaAddition } from './egarita-addition/egarita-addition';
import { TsteeleAddition } from './tsteele-addition/tsteele-addition';

@Component({
  imports: [
    PizzaToppings,
    EgaritaAddition,
    TsteeleAddition,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-components');
}
