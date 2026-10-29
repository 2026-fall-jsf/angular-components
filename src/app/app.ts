import { Component, signal } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';
import { JebashelTax } from './jebashel-tax/jebashel-tax';

@Component({
  imports: [
    PizzaToppings,
    JebashelTax,
],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-components');
}
