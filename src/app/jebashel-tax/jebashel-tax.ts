import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle, MatCardHeader } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PizzaService } from '../pizza.service';

@Component({
  imports: [
    CurrencyPipe,
    MatCard, 
    MatCardContent, 
    MatCardTitle, 
    MatCardHeader,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'app-jebashel-tax',
  styleUrl: './jebashel-tax.css',
  templateUrl: './jebashel-tax.html',
})
export class JebashelTax {
  
  private readonly pizzaSvc = inject(
    PizzaService
  );

  protected readonly orderTotal = computed(() => this.pizzaSvc.toppingTotal());
  protected readonly taxSum = signal(4.98);

  // protected readonly updateOrderTotal = (num: string) => this.orderTotal.set(Number(num));

  protected readonly add = () => this.taxSum.set(this.pizzaSvc.toppingTotal() * 1.05);
}
