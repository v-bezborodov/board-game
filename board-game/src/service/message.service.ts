import {IMessageDto} from "../model/dto/message.dto";
import {IMessage} from "../model/message";
import {MessageRepository} from "../repository/message.repository";
import {UserService} from "./user.service";

export class MessageService {

    public static async create(message: IMessage): Promise<IMessageDto> {
        const savedMessage = await MessageRepository.create(message);
        const user = await UserService.findById(message.authorId);
        return {
            _id: savedMessage._id,
            authorId: savedMessage.authorId,
            authorName: user?.name,
            authorImage: user?.avatar,
            conversationId: savedMessage.conversationId,
            date: savedMessage.date,
            isRead: savedMessage.isRead,
            text: savedMessage.text
        };
    }

    public static async getByConversationId(conversationId: any): Promise<IMessageDto[]> {
        const messages = await MessageRepository.findByConversationId(conversationId);
        const messagesDto: IMessageDto[] = [];
        for(let message of messages) {
            const user = await UserService.findById(message.authorId);
            const messageDto: IMessageDto = {
                _id: message._id,
                authorId: message.authorId,
                authorName: user?.name,
                authorImage: user?.avatar,
                conversationId: message.conversationId,
                date: message.date,
                isRead: message.isRead,
                text: message.text
            };
            messagesDto.push(messageDto);
        }
        return messagesDto;

    }

}
