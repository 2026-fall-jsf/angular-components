import { Component, inject, signal } from '@angular/core';
import { PizzaService } from '../pizza.service';

@Component({
  imports: [],
  selector: 'app-pizza-toppings',
  styleUrl: './pizza-toppings.css',
  templateUrl: './pizza-toppings.html',
})
export class PizzaToppings {
  private readonly pizzaSvc = inject(PizzaService);

  protected readonly availablePizzaToppings = signal(this.pizzaSvc.getAvailablePizzaToppings());
}
