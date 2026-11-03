import { Component, input, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tsteele-multiplication',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './tsteele-multiplication.html',
  styleUrl: './tsteele-multiplication.css',
})
export class TsteeleMultiplication {

  readonly title = input("Tom's Multiplication Component");
  readonly initialNumberOne = input(100);
  readonly initialNumberTwo = input(42);

  protected readonly numberOne = linkedSignal(() => this.initialNumberOne());
  protected readonly numberTwo = linkedSignal(() => this.initialNumberTwo());
  protected readonly product = linkedSignal(() => this.initialNumberOne() * this.initialNumberTwo());

  protected readonly updateNumberOne = (num: string) => this.numberOne.set(Number(num));
  protected readonly updateNumberTwo = (num: string) => this.numberTwo.set(Number(num));

  protected readonly multiply = () => this.product.set(this.numberOne() * this.numberTwo());

}
