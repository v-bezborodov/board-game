import {MutationSymbol} from '../enums/mutation-symbol.enum';

export class ResourceMutation {

  resourceId: string;
  regularMutationValue: number;
  regularMutationSymbol: MutationSymbol;
  mutationValue: number;
  mutationSymbol: MutationSymbol;

}
