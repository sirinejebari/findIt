import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { GithubService } from './github/shared/github.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BaseRequestOptions, HttpModule, RequestOptions} from '@angular/http';
import { AgmCoreModule } from '@agm/core';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RepoBrowserComponent } from './github/repo-browser/repo-browser.component';
import { RepoListComponent } from './github/repo-list/repo-list.component';
import { RepoDetailComponent } from './github/repo-detail/repo-detail.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navigationComponents/navbar/navbar.component';
import { AdsRowComponent } from './home/adsTableCells/ads.row.component';
import { AdService } from './services/ad.service';
import { locationService } from './services/locationService';
import { LoginModalComponent } from './login/login.component';
import { CustomRequestOptions } from './services/authentificationService';
import {AuthentificationService} from './services/authentificationService'

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RepoBrowserComponent,
    RepoListComponent,
    RepoDetailComponent,
    HomeComponent,
    ContactComponent,
    NavbarComponent,
    AdsRowComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAyxWCgefPm-yuk01Nzo0NM0a3rYbXsOgo'
    })
  ],
  providers: [
    GithubService,
    AdService,locationService,AuthentificationService,
    {provide: RequestOptions, useClass: CustomRequestOptions}

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
