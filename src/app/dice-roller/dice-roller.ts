import { Component, computed, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const ROLL_DURATION_MS = 700;
const FACE_CHANGE_MS = 80;
const CONFETTI_DURATION_MS = 2000;
const CONFETTI_COUNT = 40;
const CONFETTI_COLORS = ['#e91e63', '#ffc107', '#4caf50', '#2196f3', '#9c27b0', '#ff5722'];

// Which of the 9 grid cells (row-major) hold a pip for each d6 value
const PIP_CELLS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

@Component({
  selector: 'app-dice-roller',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './dice-roller.html',
  styleUrl: './dice-roller.css',
})
export class DiceRoller {

  readonly title = input('Dice Roller');
  readonly sides = input(6);

  protected readonly result = signal<number | null>(null);
  protected readonly rolling = signal(false);

  protected readonly cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // Idle die shows six pips until the first roll
  protected readonly shown = computed(() => this.result() ?? 6);
  protected readonly isD6 = computed(() => this.sides() === 6);
  protected readonly hasPip = (cell: number) => PIP_CELLS[this.shown()]?.includes(cell) ?? false;

  protected readonly confetti = signal<{ left: number; delay: number; drift: number; color: string }[]>([]);

  private readonly randomRoll = () => Math.floor(Math.random() * this.sides()) + 1;

  protected readonly roll = () => {
    if (this.rolling()) {
      return;
    }
    this.rolling.set(true);
    const shuffle = setInterval(() => this.result.set(this.randomRoll()), FACE_CHANGE_MS);
    setTimeout(() => {
      clearInterval(shuffle);
      this.result.set(this.randomRoll());
      this.rolling.set(false);
      this.launchConfetti();
    }, ROLL_DURATION_MS);
  };

  private readonly launchConfetti = () => {
    this.confetti.set(Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 120,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    })));
    setTimeout(() => this.confetti.set([]), CONFETTI_DURATION_MS);
  };

}


