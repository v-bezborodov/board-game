import {Component, OnInit} from '@angular/core';
import {DiceStoreService} from '../../services/stores/dice-store.service';
import {ResourceStoreService} from '../../services/stores/resource-store.service';
import {Router} from '@angular/router';
import {DeckStoreService} from '../../services/stores/deck-store.service';
import {PatternStoreService} from '../../services/stores/pattern-store.service';
import {Pattern} from '../../models/pattern.model';
import {PatternService} from '../../services/pattern.service';
import {StoreEventService} from '../../services/stores/store-event.service';

@Component({
  selector: 'app-pattern-edit-sidenav',
  templateUrl: './pattern-edit-sidenav.component.html',
  styleUrls: ['./pattern-edit-sidenav.component.scss']
})
export class PatternEditSidenavComponent implements OnInit {

  dicesSubList = false;
  resourcesSubList = false;
  deckSubList = false;

  constructor(private router: Router,
              private patternService: PatternService,
              private storeEventService: StoreEventService) {
  }

  ngOnInit(): void {
    this.router.navigate(['/pattern/general']);
  }

  addDice(): void {
    DiceStoreService.addDice();
  }

  addResource(): void {
    ResourceStoreService.addResource();
  }

  addDeck(): void {
    DeckStoreService.addDeck();
  }

  dicesSubListAction(): void {
    this.dicesSubList = !this.dicesSubList;
    this.resourcesSubList = false;
    this.deckSubList = false;
    this.router.navigate(['/pattern/dices']);
  }

  resourcesSubListAction(): void {
    this.resourcesSubList = !this.resourcesSubList;
    this.dicesSubList = false;
    this.deckSubList = false;
    this.router.navigate(['/pattern/resources']);
  }

  decksSubListAction(): void {
    this.deckSubList = !this.deckSubList;
    this.dicesSubList = false;
    this.resourcesSubList = false;
    this.router.navigate(['/pattern/deck']);
  }

  save(): void {
    this.storeEventService.sendEvent();

    setTimeout(() => {
      const pattern = PatternStoreService.getGamePatterns();
      const resources = ResourceStoreService.getResources();
      const decks = DeckStoreService.getDecks();
      const dices = DiceStoreService.getDices();

      pattern.resources = resources;
      pattern.decks = decks;
      pattern.dices = dices;

      this.patternService.update(pattern).subscribe(() => {
        this.exit();
      }, error => alert(error.error));
    }, 1000);
  }

  publish(): void {
    if (!PatternStoreService.getGamePatterns()._id) {
      return;
    }

    this.patternService.publish(PatternStoreService.getGamePatterns()._id).subscribe(
      () => {
        this.router.navigate(['/board-games/patterns']);
      },
      error => {
        alert(error.error);
      }
    );
  }

  exit(): void {
    ResourceStoreService.setResources([]);
    DeckStoreService.setDecks([]);
    DiceStoreService.setDices([]);
    PatternStoreService.setGamePatterns(new Pattern());
    this.router.navigate(['/board-games/patterns']);
  }

}
