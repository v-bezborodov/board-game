import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Game, GameDto} from '../../../models/game.model';
import {MatTableDataSource} from '@angular/material/table';
import {GameService} from '../../../services/game.service';
import {GameStoreService} from '../../../services/stores/game-store.service';
import {User} from '../../../models/user.model';
import {UserStoreService} from '../../../services/stores/user-store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['name', 'patternName', 'membersCount', 'action'];
  dataSource = new MatTableDataSource<Game>([]);


  displayedColumnsAll: string[] = ['name', 'patternName', 'adminName', 'action'];
  dataSourceAll = new MatTableDataSource<GameDto>([]);

  displayedColumnsMember: string[] = ['name', 'patternName', 'adminName', 'action'];
  dataSourceMember = new MatTableDataSource<GameDto>([]);

  currentUser: User;

  constructor(private gameService: GameService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = UserStoreService.getCurrentUser();

    UserStoreService.getSubscription().subscribe(updatedUser => {
      this.currentUser = updatedUser;
    });

    this.subscription = this.gameService.getAll().subscribe((games: GameDto[]) => {
      this.dataSource.data = games.filter(game => game.userId === this.currentUser._id);
      this.dataSourceMember.data = games.filter(game => !this.dataSource.data.includes(game) && (game.isMember || game.hasRequest));
      this.dataSourceAll.data = games.filter(game => !this.dataSource.data.includes(game) && !this.dataSourceMember.data.includes(game));
    }, error => {
      alert(error.error);
    });

    GameStoreService.subscription.subscribe(game => {
      this.dataSource.data = [...this.dataSource.data, game];
    });

  }

  deleteGame(gameToDelete: GameDto) {
    this.subscription = this.gameService.delete(gameToDelete._id).subscribe(() => {

      this.dataSource.data = this.dataSource.data.filter(game => {
        if (game._id !== gameToDelete._id) {
          return game;
        }
      });
    });
  }

  startGame(game: GameDto) {
    this.gameService.start(game._id).subscribe(() => {
      sessionStorage.setItem('roomId', game._id);
      this.router.navigate(['/game-window']);
    });
  }

  joinGame(game: GameDto) {
    sessionStorage.setItem('roomId', game._id);
    this.router.navigate(['/game-window']);
  }

  addRequest(game: GameDto) {
    this.gameService.sendRequest(game._id).subscribe(
      () => {
        this.dataSourceAll.data = this.dataSourceAll.data.filter(tempGame => tempGame._id !== game._id);
        game.hasRequest = true;
        this.dataSourceMember.data = [...this.dataSourceMember.data, game];
      },
      error => {
        alert(error.error);
      }
    );
  }

  openGameAdminView(userId: string) {
    this.router.navigate([`board-games/practitioner/${userId}`]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
