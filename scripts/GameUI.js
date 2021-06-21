function GameUI(settingsRepository, scoreRepository) {
  this.settings = settingsRepository;
  this.game;
  this.message = ''

  this.setCellIcon = (row, cell, icon) =>
    icon === '' 
    ? document.getElementById(`square_${row}${cell}`).innerHTML = icon
    : document.getElementById(`square_${row}${cell}`).innerHTML = `<p>${icon}</p>`;

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

  this.updateMessage = () => {
    var message = document.getElementById('gameMessage');
    if (this.game.userWon())
      message.innerHTML = 'You Won!';
    else if (this.game.computerWon())
      message.innerHTML = 'Computer Won!';
    else if (this.game.gameIsDraw())
      message.innerHTML = 'Draw!';
    else
      message.innerHTML = '';
  }

  this.chooseSquare = (row, col) => {
    if (this.game.gameIsOver())
      return;
    
    this.game.takePlayerTurn(row, col);
    if (this.game.userWon())
      scoreRepository.addWin();
    else if (this.game.gameIsDraw())
      scoreRepository.addDraw();
    else {
      this.game.takeComputerTurn();
      if (this.game.computerWon())
        scoreRepository.addLoss();
      else if (this.game.gameIsDraw())
        scoreRepository.addDraw();
    }

    this.updateMessage();
    this.updateGameBoard();
  }

  this.newGame = () => {
    this.game = new TicTacToe(this.settings);
    this.updateMessage();
  }
}