import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  imports: [
    MatCardModule,
    MatRadioModule,
  ],
  selector: 'app-leave-tip',
  styleUrl: './leave-tip.css',
  templateUrl: './leave-tip.html',
})
export class LeaveTip {}
