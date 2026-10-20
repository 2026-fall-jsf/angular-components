import { Component, computed, inject, signal } from '@angular/core';
import { PizzaService, PizzaTopping } from '../pizza.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [
    CurrencyPipe
  ],
  selector: 'app-pizza-toppings',
  styleUrl: './pizza-toppings.css',
  templateUrl: './pizza-toppings.html',
})
export class PizzaToppings {

  private readonly pizzaSvc = inject(
    PizzaService
  );

  protected readonly avaliablePizzaToppings = signal(
    this.pizzaSvc.getAvailablePizzaToppings()
  );

  protected readonly total = computed(
    () => this.avaliablePizzaToppings()
    .filter(
      (x: PizzaTopping) => x.checked
    )
    .reduce(
      (acc, x: PizzaTopping) => acc + x.price,
      0,
    )
  );

  protected readonly toggleTopping = (toppingToToggle: PizzaTopping) => this.avaliablePizzaToppings.update(
    toppings => toppings.map(
      t => t === toppingToToggle
        ? {
          ...t,
          checked: !t.checked
        }
        : t
    )
  );
}
