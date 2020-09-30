export class Message {
  _id: any;
  authorId: any;
  text: string;
  date: Date;
  isRead: boolean;
  conversationId: string;
}

export class MessageDto {
  _id: any;
  authorId: any;
  authorName: string;
  authorImage: string;
  text: string;
  date: Date;
  isRead: boolean;
  conversationId: string;
}


