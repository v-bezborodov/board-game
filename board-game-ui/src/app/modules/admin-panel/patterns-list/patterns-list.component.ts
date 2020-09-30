import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Pattern} from '../../../models/pattern.model';
import {PatternService} from '../../../services/pattern.service';

@Component({
  selector: 'app-patterns-list',
  templateUrl: './patterns-list.component.html',
  styleUrls: ['./patterns-list.component.scss']
})
export class PatternsListComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  ELEMENT_DATA: Pattern[] = [];

  displayedColumns: string[] = ['name', 'description', 'mode', 'createdAt'];
  dataSource = this.ELEMENT_DATA;

  constructor(private patternService: PatternService) { }

  ngOnInit(): void {
    this.subscription = this.patternService.getAll().subscribe((patterns: Pattern[]) => {
      this.dataSource = patterns;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
