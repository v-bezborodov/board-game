import {Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  static currentUser: User = new User();
  static subscription = new Subject<User>();

  static getCurrentUser(): User {
    return this.currentUser;
  }

  static getSubscription(): Subject<User> {
    return this.subscription;
  }

  static setCurrentUser(user: User) {
    this.currentUser = user;
    this.subscription.next(user);
  }

}
