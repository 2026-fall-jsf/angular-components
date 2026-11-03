import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// Which of the 9 pip cells (3x3 grid) are lit for each d6 face value.
const PIPS: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

// Cube rotation (degrees) that brings the face for each d6 value to the front.
// Face order on the cube: 1 front, 2 right, 3 top, 4 bottom, 5 left, 6 back.
const D6_ROTATION: Record<number, [number, number]> = {
  1: [0, 0],
  2: [0, -90],
  3: [-90, 0],
  4: [90, 0],
  5: [0, 90],
  6: [0, 180],
};

interface Die {
  faces: (number | string)[];
  transform: string;
  delay: string;
}

type Mode = 'custom' | 'mockery';
type Edition = '2014' | '2024';

// Flavor text for the verbal barb that accompanies the damage.
const INSULTS = [
  'Your mother was a hamster and your father smelt of elderberries!',
  'You fight like a dairy farmer!',
  "I've seen scarier things in a gnome's sock drawer.",
  'Is that your face, or did your helmet melt?',
  'You have the tactical mind of a wet biscuit.',
  'Your fighting stance is a cry for help.',
  "I'd call you a coward, but that would insult cowards.",
  'Even the goblins are embarrassed for you.',
  'You smell like a troll gargled a bog.',
  'Your sword is as dull as your wit.',
];

@Component({
  selector: 'app-dice-roller',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './dice-roller.html',
  styleUrl: './dice-roller.css',
})
export class DiceRoller {

  protected readonly sidesOptions = [4, 6, 8, 10, 12, 20, 100];
  protected readonly countOptions = [1, 2, 3, 4, 5, 6];

  protected readonly levelOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  protected readonly sides = signal(6);
  protected readonly count = signal(2);
  protected readonly mode = signal<Mode>('custom');
  protected readonly level = signal(1);
  protected readonly edition = signal<Edition>('2014');
  protected readonly insult = signal('');
  // Running total of psychic damage the target has taken from all casts.
  protected readonly damageTaken = signal(0);
  protected readonly rolls = signal<number[]>([]);
  protected readonly history = signal<string[]>([]);
  protected readonly rolling = signal(false);
  // Incremented every roll so each cube always tumbles forward.
  private readonly spin = signal(0);

  protected readonly isMockery = computed(() => this.mode() === 'mockery');

  // Vicious Mockery cantrip scaling: +1 die at levels 5, 11 and 17.
  // 2014 rules use d4s, 2024 rules use d6s.
  protected readonly mockeryDice = computed(() => {
    const level = this.level();
    return level >= 17 ? 4 : level >= 11 ? 3 : level >= 5 ? 2 : 1;
  });

  // The dice actually rolled, depending on the mode.
  protected readonly effectiveCount = computed(() =>
    this.isMockery() ? this.mockeryDice() : this.count()
  );
  protected readonly effectiveSides = computed(() =>
    this.isMockery() ? (this.edition() === '2024' ? 6 : 4) : this.sides()
  );

  protected readonly isD6 = computed(() => this.effectiveSides() === 6);

  // One 3D cube per die; shows "?" until it has been rolled.
  protected readonly dice = computed<Die[]>(() => {
    const sides = this.effectiveSides();
    const spin = this.spin();
    return Array.from({ length: this.effectiveCount() }, (_, i) => {
      const value = this.rolls()[i];
      let faces: (number | string)[];
      let rotation: [number, number] = [0, 0];

      if (sides === 6) {
        faces = [1, 2, 3, 4, 5, 6];
        if (value !== undefined) {
          rotation = D6_ROTATION[value];
        }
      } else {
        const base = value ?? 0;
        faces = [
          value ?? '?',
          ...[1, 2, 3, 4, 5].map((k) => ((base + k * 3) % sides) + 1),
        ];
      }

      const extra = spin * 720;
      return {
        faces,
        transform: `rotateX(${rotation[0] + extra}deg) rotateY(${rotation[1] + extra}deg)`,
        delay: `${i * 80}ms`,
      };
    });
  });

  protected readonly pipOn = (face: number | string, cell: number) =>
    typeof face === 'number' && PIPS[face]?.includes(cell);

  protected readonly cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  protected readonly total = computed(() =>
    this.rolls().reduce((sum, roll) => sum + roll, 0)
  );

  protected readonly setCount = (count: number) => {
    this.count.set(count);
    this.rolls.set([]);
  };

  protected readonly setSides = (sides: number) => {
    this.sides.set(sides);
    this.rolls.set([]);
  };

  protected readonly setMode = (mode: Mode) => {
    this.mode.set(mode);
    this.rolls.set([]);
    this.insult.set('');
  };

  protected readonly setLevel = (level: number) => {
    this.level.set(level);
    this.rolls.set([]);
  };

  protected readonly setEdition = (edition: Edition) => {
    this.edition.set(edition);
    this.rolls.set([]);
  };

  protected readonly roll = () => {
    if (this.rolling()) {
      return;
    }
    this.rolling.set(true);
    const sides = this.effectiveSides();
    const count = this.effectiveCount();
    const results = Array.from(
      { length: count },
      () => Math.floor(Math.random() * sides) + 1
    );
    this.spin.update((s) => s + 1);
    this.rolls.set(results);
    const sum = results.reduce((a, b) => a + b, 0);

    let entry = `${count}d${sides}: ${results.join(' + ')} = ${sum}`;
    if (this.isMockery()) {
      const insult = INSULTS[Math.floor(Math.random() * INSULTS.length)];
      this.insult.set(insult);
      this.damageTaken.update((d) => d + sum);
      entry = `Vicious Mockery (lvl ${this.level()}): ${entry} psychic`;
    }
    this.history.update((h) => [entry, ...h].slice(0, 10));

    // Wait for the tumble animation to finish before allowing another roll.
    setTimeout(() => this.rolling.set(false), 1000 + count * 80);
  };

  protected readonly clearHistory = () => {
    this.history.set([]);
    this.rolls.set([]);
    this.insult.set('');
    this.damageTaken.set(0);
  };
}
