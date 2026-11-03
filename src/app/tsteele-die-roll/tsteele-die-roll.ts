import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const DIE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const FIRST_TICK_MS = 60;
const TICK_SLOWDOWN = 1.2;

@Component({
  selector: 'app-tsteele-die-roll',
  imports: [
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './tsteele-die-roll.html',
  styleUrl: './tsteele-die-roll.css',
})
export class TsteeleDieRoll {

  private readonly faceIndex = signal(5);

  protected readonly face = () => DIE_FACES[this.faceIndex()];
  protected readonly rolling = signal(false);

  protected readonly rollDie = () => {
    this.rolling.set(true);
    this.tick(FIRST_TICK_MS);
  };

  // The CSS animation sets the roll duration; the face it last landed on is the result
  protected readonly finishRoll = () => this.rolling.set(false);

  // Shows a different face each tick, with growing gaps to match the slowing spin
  private readonly tick = (delay: number) => setTimeout(
    () => {
      if (!this.rolling()) {
        return;
      }
      this.faceIndex.update(i => (i + 1 + Math.floor(Math.random() * 5)) % 6);
      this.tick(delay * TICK_SLOWDOWN);
    },
    delay
  );

}
