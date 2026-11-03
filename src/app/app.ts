import { Component, signal } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';
import { LeaveTip } from './leave-tip/leave-tip';
import { EleeDatePicker } from './elee-date-picker/elee-date-picker';
import { MlyCrustSelection } from './mly-crust-selection/mly-crust-selection';
import { EgaritaAddition } from './egarita-addition/egarita-addition';
import { TsteeleAddition } from './tsteele-addition/tsteele-addition';
import { SkandMultiplication } from './skand-multiplication/skand-multiplication';
import { SlotMachine } from './slot-machine/slot-machine';

@Component({
  imports: [
    PizzaToppings,
    LeaveTip,
    EleeDatePicker,
    MlyCrustSelection,
    EgaritaAddition,
    TsteeleAddition,
    SkandMultiplication,
    SlotMachine,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-components');
}
