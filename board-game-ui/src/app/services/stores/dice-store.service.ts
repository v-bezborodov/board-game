import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Dice} from '../../models/dice.model';

@Injectable({
  providedIn: 'root'
})
export class DiceStoreService {

  static _subscription = new Subject<void>();
  static dice: Dice[] = [];

  static get subscription() {
    return this._subscription;
  }

  static addDice() {
    this._subscription.next();
  }

  static getDices(): Dice[] {
    return this.dice;
  }

  static setDices(dices: Dice[]): void {
    this.dice = dices;
  }

}
