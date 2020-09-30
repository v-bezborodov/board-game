import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignInComponent} from './modules/sign-in/sign-in.component';
import {SignUpComponent} from './modules/sign-up/sign-up.component';
import {TermsAndConditionsComponent} from './modules/terms-and-conditions/terms-and-conditions.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SidenavModule} from './modules/sidenav/sidenav.module';
import {MatDividerModule} from '@angular/material/divider';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthHeaderInterceptor} from './interseptors/auth-header.interseptor';
import {PatternEditSidenavModule} from './modules/pattern-edit-sidenav/pattern-edit-sidenav.module';
import {AdminPanelModule} from './modules/admin-panel/admin-panel.module';
import {MatSelectModule} from '@angular/material/select';
import {GameAdminComponent} from './modules/game-admin/game-admin.component';
import {GameWindowModule} from './modules/game-window/game-window.module';
import { ZoomMtg } from '@zoomus/websdk';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    TermsAndConditionsComponent,
    GameAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminPanelModule,
    PatternEditSidenavModule,
    BrowserAnimationsModule,
    SidenavModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    HttpClientModule,
    MatSelectModule,
    GameWindowModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('248064309956408'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
