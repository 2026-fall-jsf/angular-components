import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle, MatCardHeader } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  protected readonly orderTotal = signal(0.99);
  protected readonly taxSum = signal(1.04);

  protected readonly updateOrderTotal = (num: string) => this.orderTotal.set(Number(num));

  protected readonly add = () => this.taxSum.set(this.orderTotal() * 1.05);
}
