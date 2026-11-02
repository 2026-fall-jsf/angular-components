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

}
