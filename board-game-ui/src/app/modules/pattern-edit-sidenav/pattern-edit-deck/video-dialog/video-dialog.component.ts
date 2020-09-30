import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent  {

  videoUrl: string;

  constructor( public dialogRef: MatDialogRef<VideoDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
