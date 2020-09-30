import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeleteGamePatternDialogComponent} from './delete-game-pattern-dialog/delete-game-pattern-dialog.component';
import {Pattern} from '../../../models/pattern.model';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {PatternService} from '../../../services/pattern.service';
import {Router} from '@angular/router';
import {PatternStoreService} from '../../../services/stores/pattern-store.service';
import {DialogService} from '../../../services/dialog.service';
import {ResourceStoreService} from '../../../services/stores/resource-store.service';
import {DeckStoreService} from '../../../services/stores/deck-store.service';
import {DiceStoreService} from '../../../services/stores/dice-store.service';

@Component({
  selector: 'app-game-pattern',
  templateUrl: './game-pattern.component.html',
  styleUrls: ['./game-pattern.component.scss']
})
export class GamePatternComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  ELEMENT_DATA: Pattern[] = [];

  displayedColumns: string[] = ['name', 'description', 'mode', 'isPublish', 'creationDate', 'action'];
  dataSource = new MatTableDataSource<Pattern>(this.ELEMENT_DATA);

  constructor(private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private patternService: PatternService) { }

  ngOnInit(): void {
    this.subscription = this.patternService.getAll().subscribe((gamePatterns: Pattern[]) => {
      this.dataSource.data = gamePatterns;
    }, error => {
      alert(error.error);
    });

    PatternStoreService.subscription.subscribe(pattern => {
      this.dataSource.data = [...this.dataSource.data, pattern];
      this.editGamePattern(pattern);
    });
  }

  editGamePattern(pattern: Pattern): void {
    PatternStoreService.setGamePatterns(pattern);
    ResourceStoreService.setResources(pattern.resources ? pattern.resources : []);
    DeckStoreService.setDecks(pattern.decks ? pattern.decks : []);
    DiceStoreService.setDices(pattern.dices ? pattern.dices : []);
    this.router.navigate(['/pattern']);
  }

  deleteGamePattern(pattern: any) {
    const dialogRef = this.dialog.open(DeleteGamePatternDialogComponent, {
      width: DialogService.getDialogWindowWidth(),
      data: pattern._id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(gamePattern  => {
          if (gamePattern._id !== result) {
            return gamePattern;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
