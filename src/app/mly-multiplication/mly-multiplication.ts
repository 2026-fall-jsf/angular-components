import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mly-multiplication',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './mly-multiplication.html',
  styleUrl: './mly-multiplication.css',
})
export class MlyMultiplication {

  protected readonly numberOne = signal(100);
  protected readonly numberTwo = signal(42);
  protected readonly product = signal(4200);

  protected readonly updateNumberOne = (num: string) => this.numberOne.set(Number(num));
  protected readonly updateNumberTwo = (num: string) => this.numberTwo.set(Number(num));

  protected readonly multiply = () => this.product.set(this.numberOne() * this.numberTwo());

}
