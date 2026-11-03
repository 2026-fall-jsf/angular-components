import { Component, signal } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';
import { LeaveTip } from './leave-tip/leave-tip';
import { EleeDatePicker } from './elee-date-picker/elee-date-picker';
import { MlyCrustSelection } from './mly-crust-selection/mly-crust-selection';
import { EgaritaAddition } from './egarita-addition/egarita-addition';
import { TsteeleAddition } from './tsteele-addition/tsteele-addition';

@Component({
  imports: [
    PizzaToppings,
    LeaveTip,
    EleeDatePicker,
    MlyCrustSelection,
    EgaritaAddition,
    TsteeleAddition,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-components');
}
