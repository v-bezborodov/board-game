import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  ELEMENT_DATA: User[] = [];

  displayedColumns: string[] = ['id', 'name', 'role', 'email'];
  dataSource = this.ELEMENT_DATA;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscription = this.userService.getAll().subscribe((users: User[]) => {
      this.dataSource = users;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
