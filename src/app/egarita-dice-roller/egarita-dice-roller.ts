import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface ConfettiPiece {
  left: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
}

const CONFETTI_COLORS = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];

// Cube rotation (x, y in degrees) that brings each value to the front.
const FACE_ROTATIONS: Record<number, [number, number]> = {
  1: [0, 0],
  2: [0, -90],
  3: [-90, 0],
  4: [90, 0],
  5: [0, 90],
  6: [0, 180],
};

// Which cells of a 3x3 grid hold a pip for each value.
const PIP_LAYOUTS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

@Component({
  imports: [MatButtonModule, MatCardModule],
  selector: 'app-egarita-dice-roller',
  styleUrl: './egarita-dice-roller.css',
  templateUrl: './egarita-dice-roller.html',
})
export class EgaritaDiceRoller {
  protected readonly sides = 6;
  protected readonly cells = Array.from({ length: 9 }, (_, i) => i);
  protected readonly faces = [1, 2, 3, 4, 5, 6].map((value) => ({
    value,
    pips: PIP_LAYOUTS[value],
  }));
  protected readonly result = signal<number | null>(null);
  protected readonly rolling = signal(false);
  protected readonly confetti = signal<ConfettiPiece[]>([]);
  protected readonly rotation = signal({ x: 0, y: 0 });
  protected readonly transitionMs = signal(0);

  private timer: ReturnType<typeof setTimeout> | undefined;
  private confettiTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timer);
      clearTimeout(this.confettiTimer);
    });
  }

  protected roll() {
    if (this.rolling()) {
      return;
    }
    clearTimeout(this.confettiTimer);
    this.confetti.set([]);
    this.rolling.set(true);

    const final = this.randomFace();
    // Each tick waits longer than the last, so the die starts fast and slows to a stop.
    const tick = (delay: number) => {
      const done = delay > 450;
      const value = done ? final : this.randomFace(this.result());
      this.turnTo(value, done ? 600 : delay);
      this.result.set(value);
      if (done) {
        this.timer = setTimeout(() => {
          this.rolling.set(false);
          this.celebrate();
        }, 600);
        return;
      }
      this.timer = setTimeout(() => tick(delay * 1.18), delay);
    };
    tick(50);
  }

  // Always spins forward at least one full turn so the cube keeps tumbling.
  private turnTo(value: number, durationMs: number) {
    const [targetX, targetY] = FACE_ROTATIONS[value];
    const { x, y } = this.rotation();
    const forward = (current: number, target: number) =>
      target + 360 * (Math.ceil((current - target) / 360) + 1);
    this.transitionMs.set(durationMs);
    this.rotation.set({ x: forward(x, targetX), y: forward(y, targetY) });
  }

  private randomFace(exclude: number | null = null) {
    let value: number;
    do {
      value = Math.floor(Math.random() * this.sides) + 1;
    } while (value === exclude);
    return value;
  }

  private celebrate() {
    this.confetti.set(
      Array.from({ length: 60 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.5 + Math.random() * 1.5,
        drift: (Math.random() - 0.5) * 200,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      })),
    );
    this.confettiTimer = setTimeout(() => this.confetti.set([]), 3500);
  }
}
