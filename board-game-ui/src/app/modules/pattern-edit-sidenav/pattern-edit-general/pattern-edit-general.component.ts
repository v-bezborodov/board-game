import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Pattern} from '../../../models/pattern.model';
import {PatternStoreService} from '../../../services/stores/pattern-store.service';
import {FileService} from '../../../services/file.service';
import {Subscription} from 'rxjs';
import {StoreEventService} from '../../../services/stores/store-event.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-pattern-edit-general',
  templateUrl: './pattern-edit-general.component.html',
  styleUrls: ['./pattern-edit-general.component.scss']
})
export class PatternEditGeneralComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  gamePattern: Pattern = new Pattern();

  generalForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    isUseLevels: new FormControl(),
    chipsCount: new FormControl(),
    chipWidth: new FormControl(),
    chipHeight: new FormControl(),
    isUserDealCards: new FormControl(),
    maxCardCount: new FormControl(),
    isDailyMove: new FormControl()
  });

  constructor(private fileService: FileService,
              private storeEventService: StoreEventService) {
  }

  ngOnInit(): void {
    this.gamePattern = PatternStoreService.getGamePatterns();
    this.setData();

    this.storeEventService.subscription.subscribe(() => {
      this.ngOnDestroy();
    });
  }

  uploadFile(file: any): void {
    const image = file.target.files[0];
    const formdata = new FormData();
    formdata.append('file', image);
    this.subscription = this.fileService.upload(formdata).subscribe(imageUrl => {
      this.gamePattern.avatar = `${environment.staticUrl}/static/${imageUrl.path}`;
    });
  }

  setData() {
    this.generalForm.controls.name.setValue(this.gamePattern.name);
    this.generalForm.controls.description.setValue(this.gamePattern.description);
    this.generalForm.controls.isUseLevels.setValue(this.gamePattern.isUseLevels);
    this.generalForm.controls.chipsCount.setValue(this.gamePattern.chipsCount);
    this.generalForm.controls.chipWidth.setValue(this.gamePattern.chipWidth);
    this.generalForm.controls.chipHeight.setValue(this.gamePattern.chipHeight);
    this.generalForm.controls.isUserDealCards.setValue(this.gamePattern.isUserDealCards);
    this.generalForm.controls.maxCardCount.setValue(this.gamePattern.maxCardCount);
    this.generalForm.controls.isDailyMove.setValue(this.gamePattern.isDailyMove);
  }

  getData() {
    this.gamePattern.name = this.generalForm.controls.name.value;
    this.gamePattern.description = this.generalForm.controls.description.value;
    this.gamePattern.isUseLevels = this.generalForm.controls.isUseLevels.value;
    this.gamePattern.chipsCount = this.generalForm.controls.chipsCount.value;
    this.gamePattern.chipWidth = this.generalForm.controls.chipWidth.value;
    this.gamePattern.chipHeight = this.generalForm.controls.chipHeight.value;
    this.gamePattern.isUserDealCards = this.generalForm.controls.isUserDealCards.value;
    this.gamePattern.maxCardCount = this.generalForm.controls.maxCardCount.value;
    this.gamePattern.isDailyMove = this.generalForm.controls.isDailyMove.value;
  }

  ngOnDestroy(): void {
    this.getData();
    PatternStoreService.setGamePatterns(this.gamePattern);
  }

}
