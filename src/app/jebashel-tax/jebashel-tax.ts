import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle, MatCardHeader } from '@angular/material/card';

@Component({
  imports: [
    CurrencyPipe,
    MatCard, 
    MatCardContent, 
    MatCardTitle, 
    MatCardHeader
  ],
  selector: 'app-jebashel-tax',
  styleUrl: './jebashel-tax.css',
  templateUrl: './jebashel-tax.html',
})
export class JebashelTax {}
