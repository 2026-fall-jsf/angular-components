import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-tsteele-addition',
  styleUrl: './tsteele-addition.css',
  templateUrl: './tsteele-addition.html',
})
export class TsteeleAddition {
  protected readonly numberOne = signal(1);
  protected readonly numberTwo = signal(2);
  protected readonly sum = signal(3);

  protected readonly updateNumberOne = (value: string) => this.numberOne.set(Number(value));
  protected readonly updateNumberTwo = (value: string) => this.numberTwo.set(Number(value));

  protected readonly addNumbers = () => this.sum.set(this.numberOne() + this.numberTwo());

}
