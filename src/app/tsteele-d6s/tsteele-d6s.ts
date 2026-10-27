import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

@Component({
  selector: 'app-tsteele-d6s',
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './tsteele-d6s.html',
  styleUrl: './tsteele-d6s.css',
})
export class TsteeleD6s {

  readonly numberOfDice = input(1);

  protected readonly dice = signal<{ id: number; face: number }[]>([]);
  private nextId = 0;
  protected readonly faces = FACES;

  protected readonly roll = () => {
    this.dice.set(
      Array.from(
        { length: this.numberOfDice() },
        () => ({ id: this.nextId++, face: Math.floor(Math.random() * 6) }),
      )
    );
  };

  protected readonly total = () => this.dice().reduce((a, x) => a + x.face + 1, 0);

}
