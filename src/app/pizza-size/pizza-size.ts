import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

type PizzaSizeOption = {
  name: string;
  price: number;
};

@Component({
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
  ],
  selector: 'app-pizza-size',
  styleUrl: './pizza-size.css',
  templateUrl: './pizza-size.html',
})
export class PizzaSize {
  protected readonly availableSizes: PizzaSizeOption[] = [
    { name: 'Small', price: 8 },
    { name: 'Medium', price: 10 },
    { name: 'Large', price: 12 },
  ];

  protected readonly selectedSize = signal<PizzaSizeOption>(
    this.availableSizes[1]
  );

  protected readonly selectSize = (size: PizzaSizeOption) => {
    this.selectedSize.set(size);
  };
}
