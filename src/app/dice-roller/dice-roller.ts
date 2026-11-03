import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dice-roller',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './dice-roller.html',
  styleUrl: './dice-roller.css',
})
export class DiceRoller {
  readonly title = input('Dice Roller');
  readonly sides = input(6);

  // Final result; null until the first roll finishes
  protected readonly result = signal<number | null>(null);

  // Value currently shown on the die (changes quickly while rolling)
  protected readonly displayed = signal<number | null>(null);
  protected readonly rolling = signal(false);
  protected readonly confetti = signal<ConfettiPiece[]>([]);

  private timer?: ReturnType<typeof setTimeout>;
  private confettiTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timer);
      clearTimeout(this.confettiTimer);
    });
  }

  // Unicode die faces ⚀-⚅ (U+2680-U+2685); only defined for 1-6
  private static readonly faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  // Face glyph for the current result, or null for non-d6 values
  protected readonly face = computed(() => {
    const value = this.displayed();
    return value === null ? null : (DiceRoller.faces[value - 1] ?? null);
  });

  private randomFace() {
    return Math.floor(Math.random() * this.sides()) + 1;
  }

  protected readonly roll = () => {
    if (this.rolling()) return;

    clearTimeout(this.confettiTimer);
    this.confetti.set([]);
    const final = this.randomFace();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.displayed.set(final);
      this.result.set(final);
      return;
    }

    this.rolling.set(true);
    this.result.set(null);

    // Start fast, then slow down each tick until the final value is shown
    let delay = 50;
    const tick = () => {
      if (delay > 400) {
        this.displayed.set(final);
        this.result.set(final);
        this.rolling.set(false);
        this.launchConfetti();
        return;
      }
      this.displayed.set(this.randomFace());
      delay *= 1.25;
      this.timer = setTimeout(tick, delay);
    };
    tick();
  };

  private launchConfetti() {
    const colors = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];
    this.confetti.set(
      Array.from({ length: 30 }, () => ({
        x: (Math.random() - 0.5) * 300,
        y: -(80 + Math.random() * 120),
        rotation: Math.random() * 720 - 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 150,
      })),
    );
    this.confettiTimer = setTimeout(() => this.confetti.set([]), 1800);
  }
}

interface ConfettiPiece {
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}
