import {Component, OnDestroy, OnInit} from '@angular/core';
import {DiceStoreService} from '../../../services/stores/dice-store.service';
import {Dice} from '../../../models/dice.model';
import {DiceMode} from '../../../enums/dice-mode.enum';
import {DiceValue} from '../../../enums/dice-value.enum';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Resource} from '../../../models/resource.model';
import {ResourceStoreService} from '../../../services/stores/resource-store.service';
import {LimitsSymbol} from '../../../enums/limits-symbol.enum';
import {uuid} from 'uuidv4';
import {ResourceLimit} from '../../../models/resource-limit.model';
import {StoreEventService} from '../../../services/stores/store-event.service';

@Component({
  selector: 'app-pattern-edit-dices',
  templateUrl: './pattern-edit-dices.component.html',
  styleUrls: ['./pattern-edit-dices.component.scss']
})
export class PatternEditDicesComponent implements OnInit, OnDestroy {

  dices: Dice[] = [];

  selectedDice: Dice;

  limits = LimitsSymbol;

  resources: Resource[] = [];

  modes = DiceMode;

  diceValues = DiceValue;

  diceForm = new FormGroup({
    name: new FormControl(),
    mode: new FormControl(),
    count: new FormControl(),
    value: new FormControl(),
    facesNumber: new FormControl()
  });

  resourceLimitForm: any;

  constructor(private fb: FormBuilder,
              private storeEventService: StoreEventService) {
  }

  ngOnInit(): void {
    this.dices = DiceStoreService.getDices();
    this.resources = ResourceStoreService.getResources();

    this.buildLimitForm();

    this.storeEventService.subscription.subscribe(() => {
      this.ngOnDestroy();
    });

    DiceStoreService.subscription.subscribe(() => {
      const dice = this.getDefaultDice();
      this.dices = [...this.dices, dice];
      this.setDiceIntoForm(dice._id);
    });
  }

  buildLimitForm(): void {
    this.resourceLimitForm = this.fb.group({});
    this.resources.forEach(resource => {
      this.resourceLimitForm.addControl(resource._id + '-value', new FormControl(''));
      this.resourceLimitForm.addControl(resource._id + '-symbol', new FormControl(''));

    });
  }

  getDiceFromForm(): void {
    if (this.selectedDice !== undefined) {
      const updatedDice: Dice  = this.selectedDice;
      if (updatedDice._id === null) {
        updatedDice._id = uuid();
      }
      updatedDice.name = this.diceForm.controls.name.value;
      updatedDice.mode = this.diceForm.controls.mode.value;
      updatedDice.dicesCount = this.diceForm.controls.count.value;
      updatedDice.value = this.diceForm.controls.value.value;
      updatedDice.facesNumber = this.diceForm.controls.facesNumber.value;
      updatedDice.limits = this.getLimits();

      const previousDice = this.dices.find(dice => dice._id === updatedDice._id);
      const index = this.dices.indexOf(previousDice);
      this.dices[index] = updatedDice;
    }
  }

  setDiceIntoForm(id: string): void {
    this.getDiceFromForm();
    this.selectedDice = this.dices.find(dice => dice._id === id);
    this.diceForm.controls.name.setValue(this.selectedDice.name);
    this.diceForm.controls.mode.setValue(this.selectedDice.mode);
    this.diceForm.controls.count.setValue(this.selectedDice.dicesCount);
    this.diceForm.controls.value.setValue(this.selectedDice.value);
    this.diceForm.controls.facesNumber.setValue(this.selectedDice.facesNumber);
    if (this.selectedDice.limits !== undefined) {
      this.resources.forEach(resource => {
        this.selectedDice.limits.forEach(limit => {
          if (resource._id === limit.resourceId) {
            this.resourceLimitForm.controls[resource._id + '-value'].setValue(limit.value);
            this.resourceLimitForm.controls[resource._id + '-symbol'].setValue(limit.symbol);
          }
        });
      });
    } else {
      this.resources.forEach(resource => {
        this.resourceLimitForm.controls[resource._id + '-value'].setValue(null);
        this.resourceLimitForm.controls[resource._id + '-symbol'].setValue(null);
      });
    }
  }

  deleteDice(id: string): void {
    this.dices = this.dices.filter(dice => {
      if (dice._id !== id) {
        return dice;
      }
    });
    if (this.dices.length === 0) {
      this.selectedDice = undefined;
    } else {
      this.setDiceIntoForm(this.dices[0]._id);
    }
  }

  getDefaultDice(): Dice {
    const dice: Dice = new Dice();
    dice._id = uuid();
    dice.name = 'Новый набор кубиков';
    dice.mode = DiceMode.AUTO;
    dice.value = DiceValue.SUN;
    dice.dicesCount = 1;
    dice.facesNumber = 6;
    return dice;
  }

  getLimits(): ResourceLimit[] {
    const limits: ResourceLimit[] = [];
    this.resources.forEach(resource => {
      const limit: ResourceLimit = new ResourceLimit();
      limit.resourceId = resource._id;
      limit.symbol = this.resourceLimitForm.controls[resource._id + '-symbol'].value;
      limit.value = this.resourceLimitForm.controls[resource._id + '-value'].value;
      limits.push(limit);
    });
    return limits;
  }

  ngOnDestroy(): void {
    this.getDiceFromForm();
    DiceStoreService.setDices(this.dices);
  }

}
