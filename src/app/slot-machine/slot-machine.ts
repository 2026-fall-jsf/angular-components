import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface ConfettiPiece {
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

@Component({
  selector: 'app-slot-machine',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './slot-machine.html',
  styleUrl: './slot-machine.css',
})
export class SlotMachine {
  readonly title = input('Slot Machine');

  private static readonly symbols = ['🍒', '🍋', '🔔', '⭐', '🍇', '7️⃣'];
  // Delay (ms) at which each reel stops; later reels spin longer
  private static readonly stopDelays = [250, 350, 480];

  protected readonly reels = signal<string[]>(['🍒', '🍋', '🔔']);
  protected readonly spinning = signal<boolean[]>([false, false, false]);
  protected readonly message = signal('Pull the lever!');
  protected readonly confetti = signal<ConfettiPiece[]>([]);

  protected readonly isSpinning = () => this.spinning().some(Boolean);

  private readonly timers: ReturnType<typeof setTimeout>[] = [];
  private confettiTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.timers.forEach(clearTimeout);
      clearTimeout(this.confettiTimer);
    });
  }

  private randomSymbol() {
    const s = SlotMachine.symbols;
    return s[Math.floor(Math.random() * s.length)];
  }

  private setReel(index: number, symbol: string) {
    this.reels.update((r) => r.map((v, i) => (i === index ? symbol : v)));
  }

  private setSpinning(index: number, value: boolean) {
    this.spinning.update((s) => s.map((v, i) => (i === index ? value : v)));
  }

  protected readonly spin = () => {
    if (this.isSpinning()) return;

    clearTimeout(this.confettiTimer);
    this.confetti.set([]);
    this.message.set('Spinning...');

    const finals = [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()];

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.reels.set(finals);
      this.finish(finals);
      return;
    }

    this.spinning.set([true, true, true]);
    let stopped = 0;

    finals.forEach((final, i) => {
      // Start fast, then slow down each tick until this reel's stop delay
      let delay = 50;
      const tick = () => {
        if (delay > SlotMachine.stopDelays[i]) {
          this.setReel(i, final);
          this.setSpinning(i, false);
          if (++stopped === finals.length) this.finish(finals);
          return;
        }
        this.setReel(i, this.randomSymbol());
        delay *= 1.2;
        this.timers[i] = setTimeout(tick, delay);
      };
      tick();
    });
  };

  private finish(finals: string[]) {
    const unique = new Set(finals).size;
    if (unique === 1) {
      this.message.set('Jackpot!');
      this.launchConfetti();
    } else if (unique === 2) {
      this.message.set('Two of a kind!');
    } else {
      this.message.set('No luck, try again!');
    }
  }

  private launchConfetti() {
    const colors = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];
    this.confetti.set(
      Array.from({ length: 40 }, () => ({
        x: (Math.random() - 0.5) * 400,
        y: -(80 + Math.random() * 120),
        rotation: Math.random() * 720 - 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 150,
      })),
    );
    this.confettiTimer = setTimeout(() => this.confetti.set([]), 1800);
  }
}
