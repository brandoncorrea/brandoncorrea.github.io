function TicTacToe(settingsRepository) {
  // props
  this.table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  this.gameIsOver = () =>
    // Top row
    (this.table[0][0] > 0
      && this.table[0][1] > 0
      && this.table[0][2] > 0)
      ||
      (this.table[0][0] < 0 
      && this.table[0][1] < 0
      && this.table[0][2] < 0)
      ||
      // Middle row
      (this.table[1][0] > 0
      && this.table[1][1] > 0
      && this.table[1][2] > 0)
      ||
      (this.table[1][0] < 0 
      && this.table[1][1] < 0
      && this.table[1][2] < 0)
      ||
      // Bottom row
      (this.table[2][0] > 0
      && this.table[2][1] > 0
      && this.table[2][2] > 0)
      ||
      (this.table[2][0] < 0 
      && this.table[2][1] < 0
      && this.table[2][2] < 0)
      ||
      // First Column
      (this.table[0][0] > 0
      && this.table[1][0] > 0
      && this.table[2][0] > 0)
      ||
      (this.table[0][0] < 0 
      && this.table[1][0] < 0
      && this.table[2][0] < 0)
      ||
      // Second Column
      (this.table[0][1] > 0
      && this.table[1][1] > 0
      && this.table[2][1] > 0)
      ||
      (this.table[0][1] < 0 
      && this.table[1][1] < 0
      && this.table[2][1] < 0)
      ||
      // Third Column
      (this.table[0][2] > 0
      && this.table[1][2] > 0
      && this.table[2][2] > 0)
      ||
      (this.table[0][2] < 0 
      && this.table[1][2] < 0
      && this.table[2][2] < 0)
      ||
      // Diagonal from top-left
      (this.table[0][0] > 0
      && this.table[1][1] > 0
      && this.table[2][2] > 0)
      ||
      (this.table[0][0] < 0 
      && this.table[1][1] < 0
      && this.table[2][2] < 0)
      ||
      // Diagonal from bottom-left
      (this.table[2][0] > 0
      && this.table[1][1] > 0
      && this.table[0][2] > 0)
      ||
      (this.table[2][0] < 0 
      && this.table[1][1] < 0
      && this.table[0][2] < 0)

  this.takeComputerTurn = () => {
    for (var r = 0; r < this.table.length; r++)
      for (var c = 0; c < this.table[r].length; c++)
        if (this.table[r][c] === 0) {
          this.table[r][c] = -1;
          return;
        }
  }

  this.takePlayerTurn = (row, cell) => this.table[row][cell] = 1;
  
  // constructor
  if (!settingsRepository.getPlayerGoesFirst())
    this.takeComputerTurn();
}
