import { Component, signal } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';
import { EleeDatePicker } from './elee-date-picker/elee-date-picker';

@Component({
  imports: [
    PizzaToppings,
    EleeDatePicker
],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-components');
}
