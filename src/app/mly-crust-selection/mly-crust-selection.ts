import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  imports: [
    MatCardModule,
    MatSlideToggleModule

],
  selector: 'app-crust-selection',
  styleUrl: './mly-crust-selection.css',
  templateUrl: './mly-crust-selection.html',
})
export class MlyCrustSelection {}
