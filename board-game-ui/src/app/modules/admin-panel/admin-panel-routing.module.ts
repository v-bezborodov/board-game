import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPanelComponent} from './admin-panel.component';
import {UsersListComponent} from './users-list/users-list.component';
import {GamesListComponent} from './games-list/games-list.component';
import {PatternsListComponent} from './patterns-list/patterns-list.component';


const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'games',
        component: GamesListComponent
      },
      {
        path: 'patterns',
        component: PatternsListComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
