import {IMessage, Message} from "../model/message";

export class MessageRepository {

    public static create(message: IMessage): Promise<IMessage> {
        return Message.create(message);
    }

    public static async findByConversationId(conversationId: any): Promise<IMessage[]> {
        return Message.find({conversationId: conversationId}).sort({date: 1});
    }

}
