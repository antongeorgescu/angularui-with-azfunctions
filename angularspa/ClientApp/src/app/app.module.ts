import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TestBlockerComponent } from './test-blocker/test-blocker.component';
import { CountryInfoComponent } from './country-info/country-info.component';
import { MsalModule, MsalInterceptor, MsalGuard } from '@azure/msal-angular';

import { environment } from '../environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProfileComponent,
    FetchDataComponent,
    TestBlockerComponent,
    CountryInfoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MsalModule.forRoot({
      auth: {
        clientId: environment.clientId,
        authority: environment.authority,
        redirectUri: environment.redirectUri
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      }
    },
    {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        ['https://graph.microsoft.com/v1.0/me/memberOf', ['user.read']],
        ['https://graph.microsoft.com/v1.0/directoryRoles', ['directory.read.all']]
      ],
      extraQueryParameters: {}
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'fetch-data', component: FetchDataComponent, canActivate : [MsalGuard] },
      { path: 'country-info', component: CountryInfoComponent, canActivate: [MsalGuard] },
      //{ path: 'fetch-data', component: FetchDataComponent },
      //{ path: 'country-info', component: CountryInfoComponent },
      { path: 'test-blocker', component: TestBlockerComponent },
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
