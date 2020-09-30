import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AdminPanelComponent} from './admin-panel.component';
import {AdminPanelRoutingModule} from './admin-panel-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { UsersListComponent } from './users-list/users-list.component';
import { GamesListComponent } from './games-list/games-list.component';
import { PatternsListComponent } from './patterns-list/patterns-list.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AdminPanelComponent,
    UsersListComponent,
    GamesListComponent,
    PatternsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AdminPanelRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AdminPanelComponent]
})
export class AdminPanelModule { }
