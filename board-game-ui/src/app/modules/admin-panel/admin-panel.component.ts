import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {UserStoreService} from '../../services/stores/user-store.service';
import {TokenStoreService} from '../../services/stores/token-store.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  currentUser: User = new User();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUser = UserStoreService.getCurrentUser();
    if (this.currentUser === undefined || this.currentUser === null) {
      this.signout();
    }

    UserStoreService.getSubscription().subscribe(user => {
      this.currentUser = user;
    });

    this.router.navigate(['/admin/users']);
  }

  signout(): void {
    TokenStoreService.accessToken = '';
    TokenStoreService.accessTokenExpirationTime = '';
    TokenStoreService.refreshToken = '';
    TokenStoreService.refreshTokenExpirationTime = '';

    UserStoreService.setCurrentUser(new User());

    this.router.navigate(['/signin']);

  }

}
