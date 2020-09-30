import {Injectable} from '@angular/core';
import {Pattern} from '../../models/pattern.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Game} from '../../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameStoreService {

  static _subscription = new Subject<Game>();

  static get subscription() {
    return this._subscription;
  }

  static addGame(game: Game) {
    this._subscription.next(game);
  }

}
