function TicTacToeBot(playerFlags) {
  this.playerFlags = playerFlags;

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
    this.getCountInTopDiagonal(table, this.playerFlags.none) === 1;

  // True if bottom-diagonal has 2 player flags and 1 empty
  this.hasTwoInBottomDiagonal = (table, playerFlag) => 
    this.getCountInBottomDiagonal(table, playerFlag) === 2 &&
    this.getCountInBottomDiagonal(table, this.playerFlags.none) === 1;

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
    var winningCell = this.getNextWinningCell(table, this.playerFlags.computer);
    if (winningCell !== null)
      return winningCell;
    return this.getNextWinningCell(table, this.playerFlags.user);
  }

  // Returns the first blank cell in a row
  this.getBlankCellInRow = (table, row) => {
    for (var col = 0; col < table[row].length; col++)
      if (table[row][col] === this.playerFlags.none)
        return { row, col };
    return null;
  }

  // Returns the first blank cell in a column
  this.getBlankCellInColumn = (table, col) => {
    for (var row = 0; row < table.length; row++)
      if (table[row][col] === this.playerFlags.none)
        return { row, col };
    return null;
  }

  // Returns the first blank cell in the bottom-left diagonal
  this.getBlankCellInBottomDiagonal = table => {
    for (var row = table.length - 1, col = 0; 
      row >= 0 && col < table.length; 
      row--, col++)
        if (table[row][col] === this.playerFlags.none)
          return { row, col };
    return null;
  }

  // Returns the first blank in the top-left diagonal
  this.getBlankCellInTopDiagonal = table => {
    for (var i = 0; i < table.length; i++)
      if (table[i][i] === this.playerFlags.none)
        return { row: i, col: i };
    return null;
  }

  // True if player is 1 away from winning row
  this.hasTwoInRow = (table, row, playerFlag) => 
    this.getCountInRow(table, row, playerFlag) === 2 && 
    this.getCountInRow(table, row, this.playerFlags.none) === 1;

  // True if player is 1 away from winning column
  this.hasTwoInColumn = (table, col, playerFlag) => 
    this.getCountInColumn(table, col, playerFlag) === 2 && 
    this.getCountInColumn(table, col, this.playerFlags.none) === 1;

  // When all else fails..
  this.getLastResortCell = table => {
    // Get a blank cell from a row or column that has the computer flag and two blanks
    for (var i = 0; i < table.length; i++) {
      if (this.getCountInColumn(table, i, this.playerFlags.computer) === 1
        && this.getCountInColumn(table, i, this.playerFlags.none) === 2)
        return this.getBlankCellInColumn(table, i);
      else if (this.getCountInRow(table, i, this.playerFlags.computer) === 1
        && this.getCountInRow(table, i, this.playerFlags.none) === 2)
        return this.getBlankCellInRow(table, i);
    }

    // Everything after round 3... just find an empty cell
    for (var r = 0; r < table.length; r++)
      for (var c = 0; c < table[r].length; c++)
        if (table[r][c] === this.playerFlags.none)
          return { row: r, col: c };
  }

  this.getFirstEmptyOrNull = (table, cells) => {
    var cell = cells.find(i => table[i.row][i.col] === this.playerFlags.none);
    if (cell === undefined)
      return null;
    return cell;
  }

  this.getNextEmptyCorner = table => 
    this.getFirstEmptyOrNull(table, [
      { row: 0, col: 0 },
      { row: 2, col: 2 },
      { row: 0, col: 2 },
      { row: 2, col: 0 }
    ]);

  this.getNextEmptySide = table => 
    this.getFirstEmptyOrNull(table, [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 2 },
      { row: 2, col: 1 }
    ]);
  
  this.getNextCellWhenUserGoesFirst = (table, computerPlays) => {
    if (computerPlays > 1) return;
    if (computerPlays === 0) { // Round 1
      if (table[1][1] === this.playerFlags.user)
        return { row: 0, col: 0 }; // User has center, take a corner
      return { row: 1, col: 1 }; // Take center
    }

    // Round 2
    if (table[1][1] === this.playerFlags.computer) { // we have center
      if (table[0][0] === this.playerFlags.user && table[2][2] === this.playerFlags.user 
        || table[0][2] === this.playerFlags.user && table[2][0] === this.playerFlags.user) // User has 2 opposing corners..
        return this.getNextEmptySide(table);

      // Handle when user has a corner..
      if (table[0][0] === this.playerFlags.user) {
        if (table[1][2] === this.playerFlags.none)
          return  { row: 1, col: 2 };
        return { row: 2, col: 1 };
      }
      if (table[0][2] === this.playerFlags.user) {
        if (table[1][0] === this.playerFlags.none)
          return { row: 1, col: 0 };
        return { row: 2, col: 1 };
      }
      if (table[2][0] === this.playerFlags.user) {
        if (table[0][1] === this.playerFlags.none)
          return { row: 0, col: 1 };
        return { row: 1, col: 2 };
      }
      if (table[2][2] === this.playerFlags.user) {
        if (table[0][1] === this.playerFlags.none)
          return { row: 0, col: 1};
        return { row: 1, col: 0 };
      }

      // User has two sides
      if (table[0][1] === this.playerFlags.user) { // User has top side
        if (table[1][2] === this.playerFlags.user) // User has right side
          return { row: 0, col: 2 }; // Take top-right corner
        return { row: 0, col: 0 }; // Take top-left corner 
      }
      if (table[2][1] === this.playerFlags.user) { // User has bottom side
        if (table[1][0] === this.playerFlags.user) // User has left side
          return { row: 2, col: 0 }; // Take bottom-left corner
        return { row: 2, col: 2 }; // Take bottom-right corner
      }
    }

    // We have [0][0]
    if (table[2][2] === this.playerFlags.user)
      return this.getNextEmptyCorner(table);
  }

  this.getNextCell = table => {
    var userPlays = this.getNumberOfPlays(table, this.playerFlags.user);
    var computerPlays = this.getNumberOfPlays(table, this.playerFlags.computer);

    // Cell is for computer to win or to prevent user from winning
    var cell = this.findPriorityCell(table);
    if (cell !== null)
      return cell;

    // User went first
    if (userPlays !== computerPlays)
      cell = this.getNextCellWhenUserGoesFirst(table, computerPlays);
    // Computer went first
    else
      cell = this.getNextEmptyCorner(table);
    
    if (cell !== null && cell !== undefined)
      return cell;
    return this.getLastResortCell(table);
  }
}