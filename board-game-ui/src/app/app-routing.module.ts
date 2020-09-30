import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from './modules/sign-in/sign-in.component';
import {SignUpComponent} from './modules/sign-up/sign-up.component';
import {TermsAndConditionsComponent} from './modules/terms-and-conditions/terms-and-conditions.component';
import {SidenavComponent} from './modules/sidenav/sidenav.component';
import {PatternEditSidenavComponent} from './modules/pattern-edit-sidenav/pattern-edit-sidenav.component';
import {GameAdminComponent} from './modules/game-admin/game-admin.component';
import {GameWindowComponent} from './modules/game-window/game-window.component';


const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: 'board-games', component: SidenavComponent },
  { path: 'pattern', component: PatternEditSidenavComponent},
  { path: 'game-admin/:id', component: GameAdminComponent},
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'game-window', component: GameWindowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
