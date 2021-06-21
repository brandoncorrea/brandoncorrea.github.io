function TicTacToeBot(playerFlags) {
  // Returns the total number of plays for the player
  this.getNumberOfPlays = (table, playerFlag) => {
    var count = 0;
    for (var i = 0; i < table.length; i++)
      count += this.getCountInRow(table, i, playerFlag);
    return count;
  }

  // Returns the total number of plays in a row for a player
  this.getCountInRow = (table, row, playerFlag) => {
    var count = 0;
    for (var col = 0; col < table[row].length; col++)
      if (table[row][col] === playerFlag)
        count++;
    return count;
  }

  // Returns the total number of plays in a column for a player
  this.getCountInColumn = (table, col, playerFlag) => {
    var count = 0;
    for (var row = 0; row < table.length; row++)
      if (table[row][col] === playerFlag)
        count++;
    return count;
  }

  // Returns the total number of plays in the top-left diagonal for a player
  this.getCountInTopDiagonal = (table, playerFlag) => {
    var count = 0;
    for (var i = 0; i < table.length; i++)
      if (table[i][i] === playerFlag)
        count++;
    return count;
  }

  // Returns the total number of plays in the bottom-left diagonal for a player
  this.getCountInBottomDiagonal = (table, playerFlag) => {
    var count = 0;
    var row = table.length - 1;
    var col = 0;
    while (row >= 0 && col < table.length)
      if (table[row--][col++] === playerFlag)
        count++;
    return count;
  }

  // True if top-diagonal has 2 player flags and 1 empty
  this.hasTwoInTopDiagonal = (table, playerFlag) => 
    this.getCountInTopDiagonal(table, playerFlag) === 2 && 
    this.getCountInTopDiagonal(table, playerFlags.none) === 1;

  // True if bottom-diagonal has 2 player flags and 1 empty
  this.hasTwoInBottomDiagonal = (table, playerFlag) => 
    this.getCountInBottomDiagonal(table, playerFlag) === 2 &&
    this.getCountInBottomDiagonal(table, playerFlags.none) === 1;

  // Returns the cell that will cause the player to win on their next play
  this.getNextWinningCell = (table, playerFlag) => {
    for (var i = 0; i < table.length; i++) {
      if (this.hasTwoInRow(table, i, playerFlag))
        return this.getBlankCellInRow(table, i);
      else if (this.hasTwoInColumn(table, i, playerFlag))
        return this.getBlankCellInColumn(table, i);
    }

    if (this.hasTwoInBottomDiagonal(table, playerFlag))
      return this.getBlankCellInBottomDiagonal(table);
    if (this.hasTwoInTopDiagonal(table, playerFlag))
      return this.getBlankCellInTopDiagonal(table);
    
    return null;
  }

  // Returns the cell that must be played next
  this.findPriorityCell = table => {
    var winningCell = this.getNextWinningCell(table, playerFlags.computer);
    if (winningCell !== null)
      return winningCell;
    return this.getNextWinningCell(table, playerFlags.user);
  }

  // Returns the first blank cell in a row
  this.getBlankCellInRow = (table, row) => {
    for (var col = 0; col < table[row].length; col++)
      if (table[row][col] === playerFlags.none)
        return new Cell(row, col);
    return null;
  }

  // Returns the first blank cell in a column
  this.getBlankCellInColumn = (table, col) => {
    for (var row = 0; row < table.length; row++)
      if (table[row][col] === playerFlags.none)
        return new Cell(row, col);
    return null;
  }

  // Returns the first blank cell in the bottom-left diagonal
  this.getBlankCellInBottomDiagonal = table => {
    var row = table.length - 1;
    var col = 0;
    for (; row >= 0 && col < table.length; row--, col++)
        if (table[row][col] === playerFlags.none)
          return new Cell(row, col);
    return null;
  }

  // Returns the first blank in the top-left diagonal
  this.getBlankCellInTopDiagonal = table => {
    for (var i = 0; i < table.length; i++)
      if (table[i][i] === playerFlags.none)
        return new Cell(i, i);
    return null;
  }

  // True if player is 1 away from winning row
  this.hasTwoInRow = (table, row, playerFlag) => 
    this.getCountInRow(table, row, playerFlag) === 2 && 
    this.getCountInRow(table, row, playerFlags.none) === 1;

  // True if player is 1 away from winning column
  this.hasTwoInColumn = (table, col, playerFlag) => 
    this.getCountInColumn(table, col, playerFlag) === 2 && 
    this.getCountInColumn(table, col, playerFlags.none) === 1;

  // Return the first empty cell
  this.getNextEmptyCell = table => {
    for (var r = 0; r < table.length; r++)
      for (var c = 0; c < table[r].length; c++)
        if (table[r][c] === playerFlags.none)
          return new Cell(r, c);
    return null;
  }

  // When all else fails, just return something
  this.getLastResortCell = table => {
    // Get a blank cell from a row or column that has the computer flag and two blanks
    for (var i = 0; i < table.length; i++) {
      if (this.getCountInColumn(table, i, playerFlags.computer) === 1
        && this.getCountInColumn(table, i, playerFlags.none) === 2)
        return this.getBlankCellInColumn(table, i);
      else if (this.getCountInRow(table, i, playerFlags.computer) === 1
        && this.getCountInRow(table, i, playerFlags.none) === 2)
        return this.getBlankCellInRow(table, i);
    }
    return this.getNextEmptyCell(table);
  }

  // Returns the first cell in the collection that is empty, or null if none are empty
  this.getFirstEmptyOrNull = (table, cells) => {
    var cell = cells.find(i => table[i.row][i.col] === playerFlags.none);
    if (cell === undefined)
      return null;
    return cell;
  }

  // Returns an empty corner, or null if all are taken
  this.getNextEmptyCorner = table => 
    this.getFirstEmptyOrNull(table, [
      new Cell(0, 0),
      new Cell(2, 2),
      new Cell(0, 2),
      new Cell(2, 0)
    ]);

  // Returns an empty side cell, or null if all are taken
  this.getNextEmptySide = table => 
    this.getFirstEmptyOrNull(table, [
      new Cell(0, 1),
      new Cell(1, 0),
      new Cell(1, 2),
      new Cell(2, 1)
    ]);
  
  // True if the player has a side cell
  this.hasSide = (table, playerFlag) => 
    table[0][1] === playerFlag || 
    table[1][0] === playerFlag || 
    table[1][2] === playerFlag || 
    table[2][1] === playerFlag;

  // True if the player has a corner cell
  this.hasCorner = (table, playerFlag) =>
    table[0][0] === playerFlag || 
    table[0][2] === playerFlag || 
    table[2][0] === playerFlag || 
    table[2][2] === playerFlag;

  // True if the player has two opposite corners
  this.hasTwoOpposingCorners = (table, playerFlag) =>
    table[0][0] === playerFlag && table[2][2] === playerFlag ||
    table[0][2] === playerFlag && table[2][0] === playerFlag;

  // Returns the first cell where the flag does not appear in that row or column
  this.getCellInUnclaimedRowAndColumn = (table, opponentFlag) => {
    for (var r = 0; r < table.length; r++)
      for (var c = 0; c < table[r].length; c++)
        if (this.getCountInRow(table, r, opponentFlag) === 0
        && this.getCountInColumn(table, c, opponentFlag) === 0)
          return new Cell(r, c);
    return null;
  }
  
  // Returns the next cell to play when the user goes first
  this.getNextCellWhenUserGoesFirst = (table, computerPlays) => {
    if (computerPlays > 1) return;
    if (computerPlays === 0) { // Round 1
      if (table[1][1] === playerFlags.user)
        return this.getNextEmptyCorner(table);
      return new Cell(1, 1); // Take center
    }
    
    // Round 2
    if (table[1][1] === playerFlags.user)
      return this.getNextEmptyCorner(table);
    if (this.hasTwoOpposingCorners(table, playerFlags.user))
      return this.getNextEmptySide(table);
    if (this.hasCorner(table, playerFlags.user) 
      && this.hasSide(table, playerFlags.user))
      return this.getCellInUnclaimedRowAndColumn(table, playerFlags.user);

    // User has two sides
    if (table[0][1] === playerFlags.user) { // User has top side
      if (table[1][2] === playerFlags.user) // User has right side
        return new Cell(0, 2); // Take top-right corner
      return new Cell(0, 0); // Take top-left corner 
    }
    if (table[2][1] === playerFlags.user) { // User has bottom side
      if (table[1][0] === playerFlags.user) // User has left side
        return new Cell(2, 0); // Take bottom-left corner
      return new Cell(2, 2); // Take bottom-right corner
    }
  }

  // Returns the next cell to be played by the computer
  this.getNextCell = table => {
    var userPlays = this.getNumberOfPlays(table, playerFlags.user);
    var computerPlays = this.getNumberOfPlays(table, playerFlags.computer);

    // Cell is for computer to win or to prevent user from winning
    var cell = this.findPriorityCell(table);
    if (cell !== null)
      return cell;
    else if (userPlays !== computerPlays) // User went first
      cell = this.getNextCellWhenUserGoesFirst(table, computerPlays);
    else // Computer went first
      cell = this.getNextEmptyCorner(table);
    
    if (cell !== null && cell !== undefined)
      return cell;
    return this.getLastResortCell(table);
  }
}