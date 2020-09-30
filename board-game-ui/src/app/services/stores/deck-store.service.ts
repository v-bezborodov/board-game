import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Deck} from '../../models/deck.model';

@Injectable({
  providedIn: 'root'
})
export class DeckStoreService {

  static _subscription = new Subject<void>();
  static decks: Deck[] = [];


  static get subscription() {
    return this._subscription;
  }

  static addDeck() {
    this._subscription.next();
  }

  static getDecks(): Deck[] {
    return this.decks;
  }

  static setDecks(decks: Deck[]): void {
    this.decks = decks;
  }

}
