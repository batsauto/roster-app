import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from '../model';

import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  players: Player[];
  selectedPlayer: Player;

  constructor(
    private playerService: PlayerService,
    private router: Router) { }

  getPlayers(): void {
    this.playerService
        .getPlayers()
        .subscribe(players => this.players = players);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.playerService.create(name)
      .subscribe(player => {
        this.players.push(player);
        this.selectedPlayer = null;
      });
  }

  delete(player: Player): void {
    this.playerService
        .delete(player.id)
        .subscribe(() => {
          this.players = this.players.filter(p => p !== player);
          if (this.selectedPlayer === player) { this.selectedPlayer = null; }
        });
  }


  ngOnInit() {
    this.getPlayers();
  }

  onSelect(player: Player): void {
    this.selectedPlayer = player;
  }

  gotoDetail(): void {
    this.router.navigate(['detail', this.selectedPlayer.id]);
  }
}
