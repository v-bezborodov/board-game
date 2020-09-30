import {DeckCard} from './deck-card.model';

export class Deck {

  _id: string;
  name: string;
  isRemoveCardsFromDeck: boolean;
  isShowCardBack: boolean;
  cardBackImage: string;
  cards: DeckCard[];
  videoUrl: string;

}
