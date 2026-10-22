import { Component, computed, inject, signal } from '@angular/core';
import { PizzaService, PizzaTopping } from '../pizza.service';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-pizza-toppings',
  templateUrl: './pizza-toppings.html',
  styleUrl: './pizza-toppings.css',
  providers: [provideNativeDateAdapter()],
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
})
export class PizzaToppings {
  private readonly pizzaSvc = inject(PizzaService);

  protected readonly availablePizzaToppings = signal(
    this.pizzaSvc.getAvailablePizzaToppings()
  );

  protected readonly total = computed(() =>
    this.availablePizzaToppings()
      .filter((x: PizzaTopping) => x.checked)
      .reduce((acc, x: PizzaTopping) => acc + x.price, 0)
  );

  protected readonly toggleTopping = (toppingToToggle: PizzaTopping) =>
    this.availablePizzaToppings.update((toppings) =>
      toppings.map((t) =>
        t === toppingToToggle
          ? {
              ...t,
              checked: !t.checked,
            }
          : t
      )
    );

  protected readonly checkAll = () =>
    this.availablePizzaToppings.update((foo) =>
      foo.map((x) => ({
        ...x,
        checked: true,
      }))
    );

  protected readonly uncheckAll = () =>
    this.availablePizzaToppings.update((foo) =>
      foo.map((x) => ({
        ...x,
        checked: false,
      }))
    );
}