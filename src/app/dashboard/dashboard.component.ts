import { Component, OnInit } from '@angular/core';

import { Player } from '../model';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  players: Player[] = [];

  constructor(
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getPlayers()
      .map(players => this.players = players)
      .subscribe();
  }

}
