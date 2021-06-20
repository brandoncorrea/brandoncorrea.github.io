class TicTacToe {
  // props
  settingsRepository;
  table;

  setCellIcon(row, cell, icon) {
    document.getElementById(`square_${row}${cell}`).innerHTML = icon;
  }

  gameIsOver() {
    // Top row
    return (this.table[0][0] > 0
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
  }

  updateGameBoard() {
    var playerIcon = this.settingsRepository.getPlayerIcon();
    var computerIcon = this.settingsRepository.getComputerIcon();

    for (var r = 0; r < this.table.length; r++)
      for (var c = 0; c < this.table[r].length; c++) {
        if (this.table[r][c] > 0)
          this.setCellIcon(r, c, playerIcon);
        else if (this.table[r][c] < 0)
          this.setCellIcon(r, c, computerIcon);
        else
          this.setCellIcon(r, c, '');
      }
  }

  takeComputerTurn() {
    for (var r = 0; r < this.table.length; r++)
      for (var c = 0; c < this.table[r].length; c++)
        if (this.table[r][c] === 0) {
          this.table[r][c] = -1;
          return;
        }
  }

  takePlayerTurn = (row, cell) => this.table[row][cell] = 1;
  
  newGame() {
    this.table = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

    if (!this.settingsRepository.getPlayerGoesFirst())
      this.takeComputerTurn();
    this.updateGameBoard();
  }

  constructor(settingsRepository) {
    this.settingsRepository = settingsRepository;
  }
}
