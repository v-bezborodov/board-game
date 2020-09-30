import {User} from './user.model';

export class Conversation {

  _id: any;
  users: User[];
  name: string;
  image: string;
  lastMessageDate: Date;
  lastMessage: string;
  unreadCount: number;

}

export class CreateConversationDto {
  userIds: any[];
}

