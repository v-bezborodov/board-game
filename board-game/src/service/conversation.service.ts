import {IConversation} from "../model/conversation";
import {ICreateConversationDto} from "../model/dto/conversation.dto";
import {ConversationRepository} from "../repository/conversation.repository";
import {UserService} from "./user.service";

const axios = require('axios');

export class ConversationService {

    public static async create(createConversationDto: ICreateConversationDto, currentUserId: any): Promise<any> {
        const conversation: IConversation = {
            _id: null,
            name: null,
            image: null,
            users: createConversationDto.userIds,
            lastMessage: null,
            unreadCount: 0,
            lastMessageDate: null
        };
        const savedConversation = await ConversationRepository.create(conversation);
        const currentUser = await UserService.findById(currentUserId);
        const destinationId = savedConversation.users.find(user => user !== currentUser?._id);
        if (destinationId) {
            const destination = await UserService.findById(destinationId);
            conversation.name = destination?.name ? destination.name: null;
            conversation.image = destination?.avatar ? destination.avatar : null;
        }
        return conversation;
    }

    public static async getAllByUserId(userId: any): Promise<IConversation[]> {
        const conversations: any = await ConversationRepository.findByUserId(userId);

        if (!conversations) {
            return [];
        }

        for (let conversation of conversations) {
            const destinationId = conversation.users.find((user: string) => user !== userId);

            if (destinationId) {
                await UserService.findById(destinationId).then(
                    (destination) => {
                        conversation._doc.name = destination?.name ? destination.name: null;
                        conversation._doc.image = destination?.avatar ? destination.avatar : null;
                    }
                );
            }
        }

        return conversations
    }

}
