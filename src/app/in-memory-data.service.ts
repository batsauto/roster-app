import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const players = [
      { id: 0, name: 'Zero' },
      { id: 1, name: 'One' },

    ];
    const teams = [
      { id: 0, name: 'Hawks'},
    ];
    return {players, teams};
  }
}
