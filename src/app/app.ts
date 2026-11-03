import { Component, signal } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';
import { LeaveTip } from './leave-tip/leave-tip';
import { EleeDatePicker } from './elee-date-picker/elee-date-picker';
import { MlyCrustSelection } from './mly-crust-selection/mly-crust-selection';
import { EgaritaAddition } from './egarita-addition/egarita-addition';
import { TsteeleAddition } from './tsteele-addition/tsteele-addition';
import { JebashelTax } from './jebashel-tax/jebashel-tax';
import { TsteeleMultiplication } from './tsteele-multiplication/tsteele-multiplication';
import { TsteeleDice } from './tsteele-dice/tsteele-dice';

@Component({
  imports: [
    PizzaToppings,
    LeaveTip,
    EleeDatePicker,
    MlyCrustSelection,
    EgaritaAddition,
    TsteeleAddition,
    JebashelTax,
    TsteeleMultiplication,
    TsteeleDice,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-components');
}
