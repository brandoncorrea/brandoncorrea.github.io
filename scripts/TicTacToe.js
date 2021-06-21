function TicTacToe(settingsRepository) {
  // props
  this.table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  this.playerFlags = {
    user: 1,
    computer: -1,
    none: 0
  }

  this.computerBot = new TicTacToeBot(this.playerFlags);

  this.hasTopLeftDiagonal = playerFlag => {
    for (var i = 0; i < this.table.length; i++)
      if (this.table[i][i] !== playerFlag)
        return false;
    return true;
  }

  this.hasBottomLeftDiagonal = playerFlag => {
    var row = this.table.length - 1;
    var col = 0;
    for (; row >= 0 && col < this.table.length; row--, col++)
      if (this.table[row][col] !== playerFlag)
        return false;
    return true;
  }

  this.hasRow = (row, playerFlag) => {
    for (var col = 0; col < this.table[row].length; col++)
      if (this.table[row][col] !== playerFlag)
        return false;
    return true;
  }

  this.hasColumn = (col, playerFlag) => {
    for (var row = 0; row < this.table.length; row++)
      if (this.table[row][col] !== playerFlag)
        return false;
    return true;
  }

  this.playerWon = playerFlag => {
    if (this.hasBottomLeftDiagonal(playerFlag) || this.hasTopLeftDiagonal(playerFlag))
      return true;
    for (var i = 0; i < this.table.length; i++)
      if (this.hasRow(i, playerFlag) || this.hasColumn(i, playerFlag))
        return true;
    return false;
  }

  this.userWon = () => this.playerWon(this.playerFlags.user);
  this.computerWon = () => this.playerWon(this.playerFlags.computer);
  this.gameIsDraw = () => {
    // Check if any cells are empty
    for (var r = 0; r < this.table.length; r++)
      for (var c = 0; c < this.table[r].length; c++)
        if (this.table[r][c] === this.playerFlags.none)
          return false;
    
    // All cells are full... return false if someone won
    return !this.userWon() && !this.computerWon();
  }

  this.gameIsOver = () => {
    if (this.userWon() || this.computerWon() || this.gameIsDraw())
      return true;
    
    for (var r = 0; r < this.table.length; r++)
      for (var c = 0; c < this.table[r].length; c++)
        if (this.table[r][c] === this.playerFlags.none)
          return false;
    return true;
  }
  
  this.takeComputerTurn = () => {
    if (this.gameIsOver())
      return;
    var cell = this.computerBot.getNextCell(this.table);
    this.table[cell.row][cell.col] = this.playerFlags.computer;
  }

  this.takePlayerTurn = (row, cell) => {
    if (!this.gameIsOver())
      this.table[row][cell] = this.playerFlags.user;
  }
  
  // constructor
  if (!settingsRepository.getPlayerGoesFirst())
    this.takeComputerTurn();
}
