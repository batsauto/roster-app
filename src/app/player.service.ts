///<reference path="../../node_modules/rxjs/add/operator/catch.d.ts"/>
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Player } from './model';
import { LoggerService } from './logger.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch'; // <-- add rxjs operator extensions used here
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/observable/throw'; // <-- add rxjs Observable extensions used here

@Injectable()
export class PlayerService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private playersUrl = 'api/players';

  constructor(
    private http: Http,
    private logger: LoggerService) { }

  getPlayers(): Observable<Player[]> {
    this.logger.log('Getting customers as an Observable via Http ...');
    return this.http
      .get(this.playersUrl)
      .map(response => response.json().data as Player[])
      .do(players => this.logger.log(`Got ${players.length} customers`))
      .catch(error => this.handleError(error));
  }

  getPlayer(id: number): Observable<Player> {
    this.logger.log('Getting states as an Observable via Http ...');
    const url =  `${this.playersUrl}/${id}`;
    return this.http
      .get(url)
      .map(response => response.json().data as Player)
      .catch(error => this.handleError(error));
  }

  create(name: string): Observable<Player> {
    return this.http
      .post(this.playersUrl, JSON.stringify({name: name}), {headers: this.headers})
      .map(res => res.json().data as Player)
      .catch(error => this.handleError(error));
  }

  delete(id: number): Observable<void> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(() => null)
      .catch(error => this.handleError(error));
  }

  update(player: Player): Observable<any> {
    const url = `${this.playersUrl}/${player.id}`;
    const result = this.http.put(url, player, { headers: this.headers })
      .do(response => this.logger.log(`Saved customer ${player.name}`))
      .share(); // execute once no matter how many subscriptions
    // Result is "cold" which means the update won't happen until something subscribes
    // Ensure update happens even if caller doesn't subscribe
    result.subscribe( // triggers the operation, making it "hot"
      undefined, // only care about failure
      error => this.handleError(error)
    );
    return result;
  }


  /** Common Http Observable error handler */
  private handleError(error: any): Observable<any> {
    this.logger.log(`An error occurred: ${error}`); // for demo purposes only
    // re-throw user-facing message
    return Observable.throw('Something bad happened; please check the console');
  }
}
