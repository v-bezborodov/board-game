import {Resource} from './resource.model';
import {Deck} from './deck.model';
import {Dice} from './dice.model';

export class Pattern {

  _id: string;
  name: string;
  description: string;
  mode: string;
  createdAt: number;

  avatar: string;
  isUseLevels: boolean;
  chipsCount: number;
  chipWidth: number;
  chipHeight: number;
  isUserDealCards: boolean;
  maxCardCount: number;
  isDailyMove: boolean;

  resources: Resource[];
  decks: Deck[];
  dices: Dice[];
  userId: string;

}

export class PatternShortDto {
  _id: any;
  name: string;
}
