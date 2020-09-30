import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pattern} from '../../../../models/pattern.model';
import {PatternService} from '../../../../services/pattern.service';
import {CopyGamePattern} from '../../../../models/copy-game-pattern.model';
import {Subscription} from 'rxjs';
import {PatternStoreService} from '../../../../services/stores/pattern-store.service';

@Component({
  selector: 'app-copy-game-pattern-dialog',
  templateUrl: './copy-game-pattern-dialog.component.html',
  styleUrls: ['./copy-game-pattern-dialog.component.scss']
})
export class CopyGamePatternDialogComponent implements OnInit, OnDestroy {

  gamePatterns: Pattern[] = [];

  subscription: Subscription = new Subscription();

  copyGamePattern: CopyGamePattern = new CopyGamePattern();

  copyGamePatternForm  = new FormGroup({
    name: new FormControl('', Validators.required),
    pattern: new FormControl('', Validators.required)
  });

  constructor(private dialogRef: MatDialogRef<CopyGamePatternDialogComponent>,
              private patternService: PatternService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.patternService.getAll().subscribe((gamePatterns: Pattern[]) => {
      this.gamePatterns = gamePatterns;
    });
  }

  copy(): void {
    this.copyGamePattern.name = this.copyGamePatternForm.controls.name.value;
    this.copyGamePattern.id = this.copyGamePatternForm.controls.pattern.value._id;

    this.subscription = this.patternService.copy(this.copyGamePattern).subscribe((gamePattern: Pattern) => {
      PatternStoreService.addPattern(gamePattern);
      this.dialogRef.close(gamePattern);
    }, error => {
      alert(error.error);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
