import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayersComponent } from './players/players.component';

import { PlayerService } from './player.service';
import { TeamService } from './team.service';
import {LoggerService} from './logger.service';

import 'hammerjs';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlayersComponent,
    PlayerDetailComponent,
    TeamsComponent,
    TeamDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [
    PlayerService,
    TeamService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
