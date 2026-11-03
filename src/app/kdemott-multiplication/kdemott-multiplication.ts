import { Component, input, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-kdemott-multiplication',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './kdemott-multiplication.html',
  styleUrl: './kdemott-multiplication.css',
})
export class KdemottMultiplication {
  readonly title = input("Kenzie's Multiplication Component");
  readonly initialNumberOne = input(100);
  readonly initialNumberTwo = input(42);

  protected readonly numberOne = linkedSignal(() => this.initialNumberOne());
  protected readonly numberTwo = linkedSignal(() => this.initialNumberTwo());
  protected readonly product = linkedSignal(
    () => this.initialNumberOne() * this.initialNumberTwo(),
  );

  protected readonly updateNumberOne = (num: string) => this.numberOne.set(Number(num));
  protected readonly updateNumberTwo = (num: string) => this.numberOne.set(Number(num));

  protected readonly multiply = () => this.product.set(this.numberOne() * this.numberTwo());
}