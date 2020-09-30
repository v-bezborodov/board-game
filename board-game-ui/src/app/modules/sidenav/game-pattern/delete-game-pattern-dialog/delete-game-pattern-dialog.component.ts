import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PatternService} from '../../../../services/pattern.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-delete-game-pattern-dialog',
  templateUrl: './delete-game-pattern-dialog.component.html',
  styleUrls: ['./delete-game-pattern-dialog.component.scss']
})
export class DeleteGamePatternDialogComponent implements OnDestroy {

  subscription: Subscription = new Subscription();

  constructor(private dialogRef: MatDialogRef<DeleteGamePatternDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public id: string,
              private patternService: PatternService) {}

  delete(): void {
    this.patternService.delete(this.id).subscribe(() => {
      this.dialogRef.close(this.id);
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
