function GameUI(settingsRepository) {
  this.settings = settingsRepository;
  this.game;

  this.setCellIcon = (row, cell, icon) => {
    document.getElementById(`square_${row}${cell}`).innerHTML = icon;
  }

  this.updateGameBoard = () => {
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

  this.chooseSquare = (row, col) => {
    this.game.takePlayerTurn(row, col);

    if (this.game.userWon()) {
      this.updateGameBoard();
      alert('You Won!');
    } else {
      this.game.takeComputerTurn();
      this.updateGameBoard();
      if (this.game.computerWon())
        alert('You Lost!');
      else if (this.game.gameIsDraw())
        alert('Draw!');
    }
  }

  this.newGame = () => {
    this.game = new TicTacToe(this.settings);
  }
}