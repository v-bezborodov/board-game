import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Deck} from '../../../models/deck.model';
import {DeckStoreService} from '../../../services/stores/deck-store.service';
import {Resource} from '../../../models/resource.model';
import {MutationSymbol} from '../../../enums/mutation-symbol.enum';
import {ResourceStoreService} from '../../../services/stores/resource-store.service';
import {uuid} from 'uuidv4';
import {DeckCard} from '../../../models/deck-card.model';
import {ResourceMutation} from '../../../models/resource-mutation.model';
import {Subscription} from 'rxjs';
import {FileService} from '../../../services/file.service';
import {StoreEventService} from '../../../services/stores/store-event.service';
import {environment} from '../../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {VideoDialogComponent} from './video-dialog/video-dialog.component';
import {DialogService} from '../../../services/dialog.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-pattern-edit-deck',
  templateUrl: './pattern-edit-deck.component.html',
  styleUrls: ['./pattern-edit-deck.component.scss']
})
export class PatternEditDeckComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  decks: Deck[] = [];
  selectedDeck: Deck;
  selectedCard: DeckCard;

  changesSymbol = MutationSymbol;

  resources: Resource[] = [];

  diceForm = new FormGroup({
    name: new FormControl(),
    isRemoveCardsFromDeck: new FormControl(),
    isShowCardBack: new FormControl(),
    cardBackImage: new FormControl()
  });

  propertiesForm: any;

  description = new FormControl();

  constructor(private fb: FormBuilder,
              private fileService: FileService,
              private storeEventService: StoreEventService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.decks = DeckStoreService.getDecks();
    this.resources = ResourceStoreService.getResources();

    this.storeEventService.subscription.subscribe(() => {
      this.ngOnDestroy();
    });

    DeckStoreService.subscription.subscribe(() => {
      const deck = this.getDefaultDeck();
      this.decks = [...this.decks, deck];
      this.setDeckIntoForm(deck._id);
    });
  }

  createMutationForm() {
    this.propertiesForm = this.fb.group({});
    this.propertiesForm.addControl('description', this.fb.control(''));
    this.resources.forEach(resource => {
      this.propertiesForm.addControl(resource._id + '-mutation-value', this.fb.control(''));
      this.propertiesForm.addControl(resource._id + '-mutation-symbol', this.fb.control(''));
      this.propertiesForm.addControl(resource._id + '-regular-mutation-value', this.fb.control(''));
      this.propertiesForm.addControl(resource._id + '-regular-mutation-symbol', this.fb.control(''));
    });
  }

  getDeckFromForm(): void {
    if (this.selectedDeck !== undefined) {
      this.getPropertiesFromForm();
      this.selectedCard = undefined;

      const updatedDeck: Deck  = this.selectedDeck;
      if (updatedDeck._id == null) {
        updatedDeck._id = uuid();
      }
      updatedDeck.name = this.diceForm.controls.name.value;
      updatedDeck.isRemoveCardsFromDeck = this.diceForm.controls.isRemoveCardsFromDeck.value;
      updatedDeck.isShowCardBack = this.diceForm.controls.isShowCardBack.value;

      const previousDice = this.decks.find(dice => dice._id === updatedDeck._id);
      const index = this.decks.indexOf(previousDice);
      this.decks[index] = updatedDeck;
    }
  }

  setDeckIntoForm(id: string): void {
    this.getDeckFromForm();
    this.selectedDeck = this.decks.find(dice => dice._id === id);
    this.diceForm.controls.name.setValue(this.selectedDeck.name);
    this.diceForm.controls.isRemoveCardsFromDeck.setValue(this.selectedDeck.isRemoveCardsFromDeck);
    this.diceForm.controls.isShowCardBack.setValue(this.selectedDeck.isShowCardBack);
    this.diceForm.controls.cardBackImage.setValue(this.selectedDeck.cardBackImage);
  }

  deleteDeck(id: string): void {
    this.decks = this.decks.filter(dice => {
      if (dice._id !== id) {
        return dice;
      }
    });
    if (this.decks.length === 0) {
      this.selectedDeck = undefined;
      this.selectedCard = undefined;
    }
  }

  getDefaultDeck(): Deck {
    const deck: Deck = new Deck();
    deck._id = uuid();
    deck.name = 'Новая колода';
    deck.cards = [];
    return deck;
  }

  uploadCardImage(file: any): void {
    const image = file.target.files[0];
    const formdata = new FormData();
    formdata.append('file', image);
    this.subscription = this.fileService.upload(formdata).subscribe(imageUrl => {
      const card = new DeckCard();
      card._id = uuid();
      card.name = image.name;
      card.url = `${environment.staticUrl}/static/${imageUrl.path}`;
      card.isVideoCard = false;
      card.resourceMutation = [];
      this.selectedDeck.cards.push(card);
    });
  }

  uploadBackCard(file: any): void {
    const image = file.target.files[0];
    const formdata = new FormData();
    formdata.append('file', image);
    this.subscription = this.fileService.upload(formdata).subscribe(imageUrl => {
      this.selectedDeck.cardBackImage = `${environment.staticUrl}/static/${imageUrl.path}`;
    });
  }

  uploadVideo(): void {
    const dialogRef = this.dialog.open(VideoDialogComponent, {
      width: DialogService.getDialogWindowWidth()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      if (result.includes('watch?v=')) {
        result = result.replace('watch?v=', 'embed/');
      }
      const card = new DeckCard();
      card._id = uuid();
      card.name = 'video';
      card.url = result;
      card.isVideoCard = true;
      card.resourceMutation = [];
      this.selectedDeck.cards.push(card);
    });
  }

  getTrustUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setPropertiesIntoForm(card: DeckCard): void {
    this.getPropertiesFromForm();
    this.selectedCard = card;
    this.createMutationForm();

    if (this.selectedCard.resourceMutation !== undefined) {
      this.propertiesForm.controls.description.setValue(this.selectedCard.description);
      this.selectedCard.resourceMutation.forEach(mutation => {
        this.propertiesForm.controls[mutation.resourceId + '-mutation-symbol'].setValue(mutation.mutationSymbol);
        this.propertiesForm.controls[mutation.resourceId + '-mutation-value'].setValue(mutation.mutationValue);
        this.propertiesForm.controls[mutation.resourceId + '-regular-mutation-symbol'].setValue(mutation.regularMutationSymbol);
        this.propertiesForm.controls[mutation.resourceId + '-regular-mutation-value'].setValue(mutation.regularMutationValue);
      });
    }

  }

  getPropertiesFromForm(): void {
    if (this.selectedCard === undefined) {
      return;
    }
    const updatedCard: DeckCard = new DeckCard();
    updatedCard._id = this.selectedCard._id;
    updatedCard.url = this.selectedCard.url;
    updatedCard.isVideoCard = this.selectedCard.isVideoCard;
    updatedCard.description = this.propertiesForm.controls.description.value;

    const mutations: ResourceMutation[] = [];

    this.resources.forEach(resource => {
      const mutation: ResourceMutation = new ResourceMutation();
      mutation.resourceId = resource._id;
      mutation.mutationSymbol = this.propertiesForm.controls[resource._id + '-mutation-symbol'].value;
      mutation.mutationValue = this.propertiesForm.controls[resource._id + '-mutation-value'].value;
      mutation.regularMutationSymbol = this.propertiesForm.controls[resource._id + '-regular-mutation-symbol'].value;
      mutation.regularMutationValue = this.propertiesForm.controls[resource._id + '-regular-mutation-value'].value;
      mutations.push(mutation);
    });

    updatedCard.resourceMutation = mutations;
    let isExist = false;
    this.selectedDeck.cards.forEach(card => {
      if (card._id === updatedCard._id) {
        const cardIndex = this.selectedDeck.cards.indexOf(card);
        this.selectedDeck.cards[cardIndex] = updatedCard;
        isExist = true;
      }
    });
    if (!isExist) {
      this.selectedDeck.cards.push(updatedCard);
    }

  }

  ngOnDestroy(): void {
    this.getDeckFromForm();
    DeckStoreService.setDecks(this.decks);
  }

}
