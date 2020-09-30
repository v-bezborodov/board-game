import {DiceMode} from '../enums/dice-mode.enum';
import {DiceValue} from '../enums/dice-value.enum';
import {ResourceLimit} from './resource-limit.model';

export class Dice {

  _id: string;
  name: string;
  mode: DiceMode;
  dicesCount: number;
  value: DiceValue;
  facesNumber: number;

  limits: ResourceLimit[];

}
