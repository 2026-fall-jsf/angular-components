import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
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

  // null until the first roll
  protected readonly result = signal<number | null>(null);

  // Unicode die faces ⚀–⚅ (U+2680–U+2685); other die sizes fall back to the number
  private static readonly FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  // Value currently drawn on the die (changes rapidly while rolling)
  private readonly shown = signal<number | null>(null);
  protected readonly rolling = signal(false);
  protected readonly confetti = signal<ConfettiPiece[]>([]);

  protected readonly display = computed(() => {
    const value = this.shown();
    if (value === null) return '🎲';
    return this.sides() === 6 ? DiceRoller.FACES[value - 1] : String(value);
  });

  private timer: ReturnType<typeof setTimeout> | undefined;
  private confettiTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timer);
      clearTimeout(this.confettiTimer);
    });
  }

  private randomFace(): number {
    return Math.floor(Math.random() * this.sides()) + 1;
  }

  protected readonly roll = () => {
    if (this.rolling()) return;

    const final = this.randomFace();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.shown.set(final);
      this.result.set(final);
      return;
    }

    this.rolling.set(true);
    this.confetti.set([]);

    // Start fast, then slow down: the delay grows each tick until it passes the limit
    let delay = 40;
    const tick = () => {
      if (delay > 380) {
        this.shown.set(final);
        this.result.set(final);
        this.rolling.set(false);
        this.celebrate();
        return;
      }
      this.shown.set(this.randomFace());
      delay *= 1.18;
      this.timer = setTimeout(tick, delay);
    };
    tick();
  };

  private celebrate() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#03a9f4', '#4caf50', '#ffeb3b', '#ff9800'];
    this.confetti.set(
      Array.from({ length: 40 }, (_, id) => ({
        id,
        color: colors[id % colors.length],
        x: Math.round((Math.random() - 0.5) * 360),
        y: Math.round(-80 - Math.random() * 120),
        rotate: Math.round(Math.random() * 720),
        delay: Math.round(Math.random() * 150),
      })),
    );
    clearTimeout(this.confettiTimer);
    this.confettiTimer = setTimeout(() => this.confetti.set([]), 1800);
  }
}

interface ConfettiPiece {
  id: number;
  color: string;
  x: number;
  y: number;
  rotate: number;
  delay: number;
}
