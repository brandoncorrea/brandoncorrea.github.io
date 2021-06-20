class GameUI {
  game;
  settings;

  setCellIcon(row, cell, icon) {
    document.getElementById(`square_${row}${cell}`).innerHTML = icon;
  }

  updateGameBoard() {
    var playerIcon = Settings.getPlayerIcon();
    var computerIcon = Settings.getComputerIcon();
  
    for (var r = 0; r < this.game.table.length; r++)
      for (var c = 0; c < this.game.table[r].length; c++) {
        if (this.game.table[r][c] > 0)
          this.setCellIcon(r, c, playerIcon);
        else if (this.game.table[r][c] < 0)
          this.setCellIcon(r, c, computerIcon);
        else
          this.setCellIcon(r, c, '');
      }
  }

  chooseSquare(row, col) {
    this.game.takePlayerTurn(row, col);

    if (!this.game.gameIsOver())
      this.game.takeComputerTurn();
    
    this.updateGameBoard();
    if (this.game.gameIsOver())
      alert('Game Over');
  }

  newGame() {
    this.game = new TicTacToe(this.settings);
  }

  constructor(settingsRepository) {
    this.settings = settingsRepository;
  }
}