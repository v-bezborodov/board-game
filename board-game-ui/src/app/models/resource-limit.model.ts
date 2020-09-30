import {LimitsSymbol} from '../enums/limits-symbol.enum';

export class ResourceLimit {

  _id: string;
  resourceId: string;
  symbol: LimitsSymbol;
  value: number;

}
