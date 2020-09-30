import {Conversation, IConversation} from "../model/conversation";

export class ConversationRepository {

    public static create(conversation: IConversation): Promise<IConversation> {
        return Conversation.create(conversation);
    }

    public static async findByUserId(userId: string): Promise<IConversation[]> {
        return Conversation.find({users: userId});
    }

}
