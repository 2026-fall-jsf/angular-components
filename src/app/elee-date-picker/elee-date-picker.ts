import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-elee-date-picker',
  styleUrl: './elee-date-picker.css',
  templateUrl: './elee-date-picker.html',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
})
export class EleeDatePicker {}