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

  protected readonly availablePizzaToppings = signal(
    this.pizzaSvc.getAvailableToppings()
  );


  protected readonly total = computed(
    () => this.availablePizzaToppings()
      .filter(
        (x: PizzaTopping) => x.checked 
      )
      .reduce(
        (acc, x: PizzaTopping) => acc + x.price,
        0,
      )
  );

  protected readonly toggleTopping = (toggleTopping: PizzaTopping) => this.availablePizzaToppings.update(
    toppings => toppings.map(
      t => t === toggleTopping
      ? {
        ...t,
        checked: !t.checked,
      } 
      : t 
    )
  );

}
