import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStoreService} from './services/stores/token-store.service';
import {UserService} from './services/user.service';
import {User} from './models/user.model';
import {UserStoreService} from './services/stores/user-store.service';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'board-games';

  constructor(private userService: UserService) {
  }

  async ngOnInit() {
    if (TokenStoreService.accessToken !== '') {
      this.userService.getCurrent().subscribe((user: User) => {
          sessionStorage.setItem('userId', user._id);
          UserStoreService.setCurrentUser(user);
        }
      );
    }
  }

  ngOnDestroy(): void {
  }

}
