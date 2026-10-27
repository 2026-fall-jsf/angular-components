import { Component} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  imports: [CurrencyPipe,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonToggleModule, 
  ],
  selector: 'app-egarita-addition',
  styleUrl: './egarita-addition.css',
  templateUrl: './egarita-addition.html',
})

export class EgaritaAddition {}
