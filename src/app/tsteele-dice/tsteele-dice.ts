import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const D6_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const CONFETTI_COLORS = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];

// Animation tuning: ticks start fast and slow down until the delay passes the max.
const START_DELAY_MS = 50;
const DELAY_GROWTH = 1.18;
const MAX_DELAY_MS = 450;
const CONFETTI_COUNT = 40;
const CONFETTI_DURATION_MS = 2500;

interface ConfettiPiece {
  left: number;
  color: string;
  delay: number;
  duration: number;
  drift: number;
}

@Component({
  selector: 'app-tsteele-dice',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './tsteele-dice.html',
  styleUrl: './tsteele-dice.css',
})
export class TsteeleDice {
  readonly title = input('Dice Roller');
  readonly sides = input(6);

  private readonly timers = new Set<ReturnType<typeof setTimeout>>();

  protected readonly result = signal<number | null>(null);
  protected readonly shown = signal<number | null>(null);
  protected readonly rolling = signal(false);
  protected readonly confetti = signal<ConfettiPiece[]>([]);
  protected readonly label = computed(() => `Roll d${this.sides()}`);
  protected readonly face = computed(() => {
    const value = this.shown();
    if (value === null) {
      return '—';
    }
    return this.sides() === 6 ? D6_FACES[value - 1] : String(value);
  });
  protected readonly description = computed(() => {
    if (this.rolling()) {
      return 'Rolling';
    }
    const value = this.result();
    return value === null ? 'Not rolled yet' : `Rolled ${value}`;
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  private readonly randomFace = () => Math.floor(Math.random() * this.sides()) + 1;

  private readonly later = (fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      this.timers.delete(id);
      fn();
    }, ms);
    this.timers.add(id);
  };

  protected readonly roll = () => {
    if (this.rolling()) {
      return;
    }
    const final = this.randomFace();
    this.confetti.set([]);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.result.set(final);
      this.shown.set(final);
      return;
    }

    this.rolling.set(true);
    const tick = (delay: number) => {
      if (delay > MAX_DELAY_MS) {
        this.result.set(final);
        this.shown.set(final);
        this.rolling.set(false);
        this.celebrate();
        return;
      }
      this.shown.set(this.randomFace());
      this.later(() => tick(delay * DELAY_GROWTH), delay);
    };
    tick(START_DELAY_MS);
  };

  private readonly celebrate = () => {
    this.confetti.set(
      Array.from({ length: CONFETTI_COUNT }, () => ({
        left: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 300,
        duration: 1200 + Math.random() * 1000,
        drift: Math.random() * 120 - 60,
      })),
    );
    this.later(() => this.confetti.set([]), CONFETTI_DURATION_MS);
  };
}
