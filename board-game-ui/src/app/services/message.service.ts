import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Conversation, CreateConversationDto} from '../models/conversation.model';
import {Message, MessageDto} from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageUrl = environment.apiUrl.message;

  constructor(private http: HttpClient) {
  }

  getAllByConversationId(conversationId: any): Observable<MessageDto[]> {
    return this.http.get<MessageDto[]>(this.messageUrl + '/' + conversationId);
  }

  send(message: Message): Observable<MessageDto> {
    return this.http.post<MessageDto>(this.messageUrl, message);
  }

}
