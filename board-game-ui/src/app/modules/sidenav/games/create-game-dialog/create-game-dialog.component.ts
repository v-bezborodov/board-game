import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PatternService} from '../../../../services/pattern.service';
import {Pattern} from '../../../../models/pattern.model';
import {Game} from '../../../../models/game.model';
import {GameService} from '../../../../services/game.service';
import {GameStoreService} from '../../../../services/stores/game-store.service';
import * as moment from 'moment';
import {environment} from '../../../../../environments/environment';
import {FileService} from '../../../../services/file.service';


@Component({
  selector: 'app-create-game-dialog',
  templateUrl: './create-game-dialog.component.html',
  styleUrls: ['./create-game-dialog.component.scss']
})
export class CreateGameDialogComponent implements OnInit {

  gamePatterns: Pattern[] = [];
  game: Game = new Game();
  minDate: Date;

  public gameAvatar: any;

  createGameForm = new FormGroup({
    name: new FormControl('', Validators.required),
    pattern: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required)
  });

  constructor(private dialogRef: MatDialogRef<CreateGameDialogComponent>,
              private patternService: PatternService,
              private fileService: FileService,
              private gameService: GameService,
              private cdr: ChangeDetectorRef) {

    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() , currentDate.getMonth(), currentDate.getDate());
  }

  ngOnInit(): void {
    this.patternService.getPublishedAll().subscribe((gamePatterns: Pattern[]) => {
      this.gamePatterns = gamePatterns;
    });
  }

  public create(): void {
    this.game.name = this.createGameForm.controls.name.value;
    this.game.patternId  = this.createGameForm.controls.pattern.value._id;
    this.game.patternName  = this.createGameForm.controls.pattern.value.name;
    this.game.date = this.createGameForm.controls.date.value;
    this.game.price = this.createGameForm.controls.price.value;
    this.game.description = this.createGameForm.controls.description.value;
    this.game.avatar = this.createGameForm.controls.avatar.value;

    const timeStr = this.createGameForm.controls.time.value;
    const time = moment(timeStr, 'HH:mm');

    this.game.date.setHours(time.hours());
    this.game.date.setMinutes(time.minutes());

    this.gameService.create(this.game).subscribe((game: Game) => {
      GameStoreService.addGame(game);
      this.dialogRef.close(game);
    }, error => {
      alert(error.error);
    });

  }

  public uploadAvatar(file: any): void {
    this.gameAvatar = file.target.files[0];
    const formdata = new FormData();
    formdata.append('file', this.gameAvatar);
    this.fileService.upload(formdata).subscribe(imageUrl => {
      this.createGameForm.controls.avatar.setValue(`${environment.staticUrl}/static/${imageUrl.path}`);
    });
  }

  public dropAvatar(): void {
    this.gameAvatar = null;
    this.createGameForm.controls.avatar.setValue(null);
    this.createGameForm.controls.avatar.markAsUntouched();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
