import {Injectable} from '@angular/core';
import {Pattern} from '../../models/pattern.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatternStoreService {

  static _subscription = new Subject<Pattern>();

  static get subscription() {
    return this._subscription;
  }

  static addPattern(pattern: Pattern) {
    this._subscription.next(pattern);
  }

  static gamePatterns: Pattern = new Pattern();

  static getGamePatterns(): Pattern {
    return this.gamePatterns;
  }

  static setGamePatterns(gamePatterns: Pattern) {
    this.gamePatterns = gamePatterns;
  }

}
