import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Game} from '../../../models/game.model';
import {GameService} from '../../../services/game.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  ELEMENT_DATA: Game[] = [];

  displayedColumns: string[] = ['id', 'name'];
  dataSource = this.ELEMENT_DATA;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.subscription = this.gameService.getAll().subscribe((games: Game[]) => {
      this.dataSource = games;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
