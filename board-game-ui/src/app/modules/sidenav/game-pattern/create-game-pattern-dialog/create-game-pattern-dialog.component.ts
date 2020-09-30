import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pattern} from '../../../../models/pattern.model';
import {PatternService} from '../../../../services/pattern.service';
import {Subscription} from 'rxjs';
import {PatternStoreService} from '../../../../services/stores/pattern-store.service';

@Component({
  selector: 'app-create-game-pattern-dialog',
  templateUrl: './create-game-pattern-dialog.component.html',
  styleUrls: ['./create-game-pattern-dialog.component.scss']
})
export class CreateGamePatternDialogComponent implements OnDestroy {

  gamePattern: Pattern = new Pattern();
  subscription: Subscription = new Subscription();

  defaultMode = [{name: 'mode'}];

  createGamePatternForm  = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    mode: new FormControl('', Validators.required)
  });

  constructor(private dialogRef: MatDialogRef<CreateGamePatternDialogComponent>,
              private patternService: PatternService) {}

  create() {
    this.gamePattern.name = this.createGamePatternForm.controls.name.value;
    this.gamePattern.description = this.createGamePatternForm.controls.description.value;
    this.gamePattern.mode = this.createGamePatternForm.controls.mode.value.name;
    this.gamePattern.createdAt = Date.now();

    this.patternService.create(this.gamePattern).subscribe((gamePattern: Pattern) => {
      PatternStoreService.addPattern(gamePattern);
      this.dialogRef.close(gamePattern);
    }, error => {
      alert(error.error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
