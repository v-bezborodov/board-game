import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
import * as moment from 'moment';
import {DateAdapter} from '@angular/material/core';
import {GameService} from '../../../services/game.service';
import {GameDto} from '../../../models/game.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-games-calendar',
  templateUrl: './games-calendar.component.html',
  styleUrls: ['./games-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GamesCalendarComponent implements OnInit {

  public selectedDate: any;
  public games: GameDto[] = [];
  public tableDataSource: any[] = [];
  public displayedColumns: string[] = ['time', 'name', 'practitioner'];

  constructor(private gameService: GameService,
              private dateAdapter: DateAdapter<any>,
              private router: Router,
              private cdr: ChangeDetectorRef) {
    this.dateAdapter.setLocale('rus');
    moment.locale('ru');
  }

  public ngOnInit(): void {
    this.gameService.getAll().subscribe(
      (games: GameDto[]) => {
        this.games = games;

        this.tableDataSource = this._filterGameByDate();
        this.cdr.detectChanges();
      }
    );

  }

  public dateChanging(date: any): void {
    this.selectedDate = date;
    const games = this._filterGameByDate();
    const formattedDate = moment(date).format('DD MMMM YYYY');
    const filteredGames = games.filter(game => game.date === formattedDate);
    if (filteredGames.length === 0) {
      this.tableDataSource = games;
    } else {
      this.tableDataSource = filteredGames;
    }
  }

  public openGameAdminView(userId: string): void {
    this.router.navigate([`board-games/practitioner/${userId}`]);
  }

  public openPlannedGameView(id: string): void {
    this.router.navigate([`board-games/game/${id}`]);
  }

  private _filterGameByDate(): any[] {
    const filteredGames: any[] = [];

    this.games = this.games.sort((a, b) => Date.parse(a.date.toString()) - Date.parse(b.date.toString()));

    let currentDate: string;

    let theSameDateGame: any;

    this.games.forEach(game => {
      const gameDate = moment(game.date).format('YYYY-MM-DD');
      if (currentDate === undefined || currentDate !== gameDate) {
        if (theSameDateGame) {
          filteredGames.push(theSameDateGame);
        }
        theSameDateGame = this._getNewGameDto(game.date);
        theSameDateGame.games.push(game);
        currentDate = gameDate;
      } else if (currentDate === gameDate) {
        theSameDateGame.games.push(game);
      }
    });
    if (theSameDateGame) {
      filteredGames.push(theSameDateGame);
    }
    return filteredGames;
  }

  private _getNewGameDto(date: Date): any {
    return {
      date: moment(date).format('DD MMMM YYYY'),
      games: []
    };

  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const dates = this.games.map(game => moment(game.date).format('YYYY-MM-DD'));
      if (dates.includes(moment(date).format('YYYY-MM-DD'))) {
        return 'event-date';
      } else {
        return;
      }
    };
  }

}
