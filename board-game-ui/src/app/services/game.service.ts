import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game, GameProfileDto} from '../models/game.model';
import {IRequest} from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameUrl = environment.apiUrl.game;

  constructor(private http: HttpClient) {
  }

  create(game: Game): Observable<Game> {
    return this.http.post<Game>(this.gameUrl.game, game);
  }

  sendRequest(gameId: string): Observable<void> {
    return this.http.put<void>(`${this.gameUrl.game}/${gameId}/requests`, null);
  }

  getRequests(): Observable<IRequest[]> {
    return this.http.get<IRequest[]>(`${this.gameUrl.game}/requests`);
  }

  acceptRequest(gameId: string, userId: string): Observable<void> {
    return this.http.put<void>(`${this.gameUrl.game}/requests/${gameId}/${userId}/accept`, null);
  }

  declineRequest(gameId: string, userId: string): Observable<void> {
    return this.http.put<void>(`${this.gameUrl.game}/requests/${gameId}/${userId}/decline`, null);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.gameUrl.game}/${id}`);
  }

  start(id: string): Observable<void> {
    return this.http.put<void>(`${this.gameUrl.game}/${id}/start`, null);
  }

  getAll(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameUrl.game);
  }

  getProfileById(id: string): Observable<GameProfileDto> {
    return this.http.get<GameProfileDto>(`${this.gameUrl.game}/profile/${id}`);
  }

}
