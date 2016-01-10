import {expect} from 'chai'

import vm from '../src/vm'

let gameFactory = ()=> {
  const winningIndeces = [0, 1, 2];
  return {
    cells: [null, null, null, null, null, null, null, null, null],
    currentPlayer: 'X',
    placeMove: function (location) {
      this.cells[location] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? '0' : 'X'
    },
    winner: function () {
      let winningCells = winningIndeces
        .map(wi => this.cells[wi]);

      let didPlayerWin = (playerToken) => {
        return winningCells
          .every(c => c === playerToken);
      };

      if (didPlayerWin('X')) {
        return 'X';
      }

      if (didPlayerWin('0')) {
        return '0';
      }

    }
  }
};

describe('new game', ()=> {
  let game;
  beforeEach(()=> {
    game = gameFactory();
  });

  it('has 9 empty cells', ()=> {
    expect(game.cells).to.have.length(9);
    expect(game.cells).to.have.all.equal(null);
  });

  it('start with X as current player', ()=> {
    expect(gameFactory().currentPlayer).to.equal('X');
  });

});

describe('first player move', () => {
  let game;
  beforeEach(()=> {
    game = gameFactory();
    game.placeMove(3);
  });

  it('changes current player to 0', ()=> {
    expect(game.currentPlayer).to.equal('0');
  });

  it('places first player token on desired location', ()=> {
    expect(game.cells[3]).to.equal('X');
  });
});

describe('second player move', () => {
  let game;
  beforeEach(()=> {
    game = gameFactory();
    game.placeMove(3);
    game.placeMove(4);
  });

  it('places second player token on desired location', ()=> {
    expect(game.cells[4]).to.equal('0');
  });

  it('changes current player to X', ()=> {
    expect(game.currentPlayer).to.equal('X');
  })
});

describe('a player wins', ()=> {
  describe('x player wins on first line', () => {
    let game;
    beforeEach(() => {
      game = gameFactory();
      game.placeMove(0);
      game.placeMove(3);
      game.placeMove(1);
      game.placeMove(6);
      game.placeMove(2);
    });


    it('X wins the game', () => {
      let result = '';
      game.cells.forEach(function (cell, idx) {
        if (idx % 3 === 0) {
          result += '\n';
        }
        result += cell;


      });
      console.log(result);

      expect(game.winner()).to.equal('X');
    })
  });

  describe('0 player wins on first line', () => {
    let game;
    beforeEach(() => {
      game = gameFactory();
      game.placeMove(3);
      game.placeMove(0);
      game.placeMove(6);
      game.placeMove(1);
      game.placeMove(7);
      game.placeMove(2);
    });

    it('0 wins the game', () => {
      expect(game.winner()).to.equal('0');
    })
  });
});

