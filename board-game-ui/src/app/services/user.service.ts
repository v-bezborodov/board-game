import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameAdminInfo, GameAdminProfile, User} from '../models/user.model';
import {UpdatePasswordRequest} from '../models/update-password-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = environment.apiUrl.user;

  constructor(private http: HttpClient) {
  }

  getCurrent(): Observable<User> {
    return this.http.get<User>(this.userUrl.currentUser);
  }

  getGameAdminProfile(userId: string): Observable<GameAdminProfile> {
    return this.http.get<GameAdminProfile>(this.userUrl.gameAdmin(userId));
  }

  updatePersonalData(user: User): Observable<User> {
    return this.http.put<User>(this.userUrl.updateData, user);
  }

  updateGameAdminInfo(info: GameAdminInfo): Observable<User> {
    return this.http.put<User>(this.userUrl.updateGameAdminInfo, info);
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<User> {
    return this.http.put<User>(this.userUrl.updatePassword, updatePasswordRequest);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl.getAll);
  }

}
