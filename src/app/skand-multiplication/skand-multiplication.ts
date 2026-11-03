import { Component, input, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-skand-multiplication',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './skand-multiplication.html',
  styleUrl: './skand-multiplication.css',
})
export class SkandMultiplication {

  readonly title = input('Multiplication Component');
  readonly initialNumberOne = input(142);
  readonly initialNumberTwo = input(142);

  // Writable signals that start from the inputs and can then be edited by the user
  protected readonly numberOne = linkedSignal(() => this.initialNumberOne());
  protected readonly numberTwo = linkedSignal(() => this.initialNumberTwo());
  protected readonly product = linkedSignal(() => this.initialNumberOne() * this.initialNumberTwo());

  protected readonly updateNumberOne = (num: string) => this.numberOne.set(Number(num));
  protected readonly updateNumberTwo = (num: string) => this.numberTwo.set(Number(num));

  protected readonly multiply = () => this.product.set(this.numberOne() * this.numberTwo());

}
