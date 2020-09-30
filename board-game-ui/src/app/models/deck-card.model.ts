import {ResourceMutation} from './resource-mutation.model';

export class DeckCard {

  _id: string;
  name: string;
  url: string;
  description: string;
  resourceMutation: ResourceMutation[];
  isVideoCard: boolean;
  position: {x, y};
  isOpen: boolean;
}
