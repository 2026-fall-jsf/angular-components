import { Component, signal, inject } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-pizza-toppings',
  styleUrl: './pizza-toppings.css',
  templateUrl: './pizza-toppings.html',
})
export class PizzaToppings {
  private readonly pizzaSvc = inject(
    PizzaService
  );

  protected readonly avaliblePizzaToppings = signal(
    this.pizzaSvc.getAvailablePizzaToppings()
  );
}
