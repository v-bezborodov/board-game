import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreEventService {

  private _subscription = new Subject();

  public get subscription() {
    return this._subscription;
  }

  public sendEvent() {
    this._subscription.next();
  }
}
