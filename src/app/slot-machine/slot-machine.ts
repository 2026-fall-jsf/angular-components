import { Component, computed, DestroyRef, inject, input, linkedSignal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

type Tier = 'mega' | 'large' | 'jackpot' | 'none';

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

  readonly startingBalance = input(100000);
  protected readonly spinCost = 25;

  // Checked from rarest to most common; chances are independent per spin
  private static readonly tiers = [
    { tier: 'mega' as const, chance: 0.005, payout: 10_000_000, name: 'MEGA JACKPOT', symbol: '7️⃣' },
    { tier: 'large' as const, chance: 0.05, payout: 2_500, name: 'Large Jackpot', symbol: '⭐' },
    { tier: 'jackpot' as const, chance: 0.10, payout: 1_000, name: 'Jackpot', symbol: null },
  ];

  // Fake money
  protected readonly balance = linkedSignal(() => this.startingBalance());
  protected readonly canSpin = computed(() => this.balance() >= this.spinCost);

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

  // Decide the outcome up front so the odds are exactly as specified
  private pickOutcome(): { tier: Tier; finals: string[] } {
    const roll = Math.random();
    let threshold = 0;
    for (const t of SlotMachine.tiers) {
      threshold += t.chance;
      if (roll < threshold) {
        const symbol = t.symbol ?? this.randomCommonSymbol();
        return { tier: t.tier, finals: [symbol, symbol, symbol] };
      }
    }
    // No jackpot: any three symbols that are not all the same
    let finals: string[];
    do {
      finals = [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()];
    } while (new Set(finals).size === 1);
    return { tier: 'none', finals };
  }

  // Symbols not reserved for the large / mega jackpots
  private randomCommonSymbol() {
    const common = SlotMachine.symbols.filter((s) => s !== '⭐' && s !== '7️⃣');
    return common[Math.floor(Math.random() * common.length)];
  }

  protected readonly spin = () => {
    if (this.isSpinning() || !this.canSpin()) return;

    clearTimeout(this.confettiTimer);
    this.confetti.set([]);
    this.message.set('Spinning...');
    this.balance.update((b) => b - this.spinCost);

    const { tier, finals } = this.pickOutcome();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.reels.set(finals);
      this.finish(finals, tier);
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
          if (++stopped === finals.length) this.finish(finals, tier);
          return;
        }
        this.setReel(i, this.randomSymbol());
        delay *= 1.2;
        this.timers[i] = setTimeout(tick, delay);
      };
      tick();
    });
  };

  private finish(finals: string[], tier: Tier) {
    const unique = new Set(finals).size;
    const win = SlotMachine.tiers.find((t) => t.tier === tier);
    if (win) {
      this.balance.update((b) => b + win.payout);
      this.message.set(`${win.name}! You won $${win.payout.toLocaleString()}`);
      this.launchConfetti(tier === 'mega' ? 150 : tier === 'large' ? 80 : 40);
    } else if (unique === 2) {
      this.message.set('Two of a kind!');
    } else {
      this.message.set(this.canSpin() ? 'No luck, try again!' : 'Out of money!');
    }
  }

  private launchConfetti(count = 40) {
    const colors = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50', '#2196f3', '#9c27b0'];
    this.confetti.set(
      Array.from({ length: count }, () => ({
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
