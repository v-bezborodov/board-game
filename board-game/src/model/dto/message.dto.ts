export interface IMessageDto {
    _id: any;
    authorId: any;
    authorName: string | null | undefined;
    authorImage: string | null | undefined;
    text: string;
    date: Date;
    isRead: boolean;
    conversationId: any;
}

