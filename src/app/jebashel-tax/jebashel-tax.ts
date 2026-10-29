import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle, MatCardHeader } from '@angular/material/card';

@Component({
  imports: [
    CurrencyPipe,
    MatCard, 
    MatCardContent, 
    MatCardTitle, 
    MatCardHeader,

  ],
  selector: 'app-jebashel-tax',
  styleUrl: './jebashel-tax.css',
  templateUrl: './jebashel-tax.html',
})
export class JebashelTax {
  protected readonly tax = computed(
    () => (this.total() * 0.05)
  );

  protected readonly totalTaxed = computed(
    () => (this.total() + this.tax()).toFixed(2)
  );
}
