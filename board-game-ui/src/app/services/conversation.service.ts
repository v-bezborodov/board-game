import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Conversation, CreateConversationDto} from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  conversationUrl = environment.apiUrl.conversation;

  constructor(private http: HttpClient) {
  }

  create(conversation: CreateConversationDto): Observable<Conversation> {
    return this.http.post<Conversation>(this.conversationUrl, conversation);
  }

  getAll(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(this.conversationUrl);
  }

}
