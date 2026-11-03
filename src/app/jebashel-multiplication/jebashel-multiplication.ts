import { Component, input, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-jebashel-multiplication',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './jebashel-multiplication.html',
  styleUrl: './jebashel-multiplication.css',
})
export class JebashelMultiplication {

  // Inputs set by the parent: <app-jebashel-multiplication [initialNumberOne]="100" ... />
  readonly title = input('Multiplication Component');
  readonly initialNumberOne = input(100);
  readonly initialNumberTwo = input(42);

  // Writable state that starts from (and resets with) the inputs
  protected readonly numberOne = linkedSignal(() => this.initialNumberOne());
  protected readonly numberTwo = linkedSignal(() => this.initialNumberTwo());
  protected readonly product = linkedSignal(() => this.initialNumberOne() * this.initialNumberTwo());

  protected readonly updateNumberOne = (num: string) => this.numberOne.set(Number(num));
  protected readonly updateNumberTwo = (num: string) => this.numberTwo.set(Number(num));

  protected readonly multiply = () => this.product.set(this.numberOne() * this.numberTwo());

}
