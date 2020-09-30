import {Component, OnInit} from '@angular/core';
import {GameService} from '../../../services/game.service';
import {UserStoreService} from '../../../services/stores/user-store.service';
import {User} from '../../../models/user.model';
import {IRequest} from '../../../models/request.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  currentUser: User;
  requests: IRequest[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.currentUser = UserStoreService.getCurrentUser();

    UserStoreService.getSubscription().subscribe(updatedUser => {
      this.currentUser = updatedUser;
    });

    this.gameService.getRequests().subscribe(
      requests => {
        this.requests = requests;
      },
      error => {
        alert(error.error);
      }
    );
  }

  getRequestLabel(request: IRequest) {
    return `${request.patternName} - ${request.gameName} - ${request.userName}`;
  }

  acceptRequest(request: IRequest) {
    this.gameService.acceptRequest(request.gameId, request.userId).subscribe(
      () => {
        this.requests = this.requests.filter(tempRequest => tempRequest !== request);
      },
      error => {
        alert(error.error);
      }
    );
  }

  declineRequest(request: IRequest) {
    this.gameService.declineRequest(request.gameId, request.userId).subscribe(
      () => {
        this.requests = this.requests.filter(tempRequest => tempRequest !== request);
      },
      error => {
        alert(error.error);
      }
    );
  }

}
