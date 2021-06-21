const playerFlags = {
  user: 1,
  computer: -1,
  none: 0
}
const bot = new TicTacToeBot(playerFlags);

function testTicTacToeBotOnClick() {
  info('Starting Test: testEmptyTable');
  testEmptyTable();
  info('Starting Test: testBotTakesMiddleAfterUsersFirstMove');
  testBotTakesMiddleAfterUsersFirstMove();
  info('Starting Test: testBotTakesBottomRightCornerOnSecondTurnAfterGoingFirst');
  testBotTakesBottomRightCornerOnSecondTurnAfterGoingFirst();
  info ('Starting Test: testAllPossibleOutcomes');
  testAllPossibleOutcomes();

  document.getElementById('passResults').innerHTML = results.passes;
  document.getElementById('failResults').innerHTML = results.fails;
}

// Tests when the bot goes first, it always takes the top-left corner cell
function testEmptyTable() {
  var table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  var cell = bot.getNextCell(table);
  var expected = new Cell(0, 0);
  assertCellsEqual(expected, cell);
}

// Tests when the user goes first and does not take the middle cell
function testBotTakesMiddleAfterUsersFirstMove() {
  var table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  var expected = new Cell(1, 1);

  // But should take middle every time, except when the user takes the middle
  for (var r = 0; r < table.length; r++) {
    for (var c = 0; c < table[r].length; c++) {
      if (r !== 1 || c !== 1) {
        table[r][c] = playerFlags.user;
        assertCellsEqual(expected, bot.getNextCell(table));
        table[r][c] = playerFlags.none;
      }
    }
  } 
}

function testBotTakesBottomRightCornerOnSecondTurnAfterGoingFirst() {
  var table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  table[0][0] = playerFlags.computer;
  var expected = new Cell(2, 2);

  for (var r = 0; r < table.length; r++) {
    for (var c = 0; c < table[r].length; c++) {
      // Only test values that are not the first or last corners
      if (!(r === 2 && c === 2) && !(r === 0 && c === 0)) {
        table[r][c] = playerFlags.user;
        assertCellsEqual(expected, bot.getNextCell(table));
        table[r][c] = playerFlags.none;
      }
    }
  }
}

// Tests all possible games when user or bot goes first
function testAllPossibleOutcomes() {
  var playStack = [];
  var table = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  testAllPossibleOutcomesBotGoesNext(table, playStack);
  testAllPossibleOutcomesUserGoesNext(table, playStack);
}

// Plays bot's turn if the game is still active and tests for all future outcomes
function testAllPossibleOutcomesBotGoesNext(table, playStack) {
  if (playerWon(table, playerFlags.user)) {
    fail('User Won');
    info(JSON.stringify(playStack));
  }
  else if (playerWon(table, playerFlags.computer))
    pass('Bot Won');
  else if (gameIsDraw(table))
    pass('Draw');
  else {
    var botMove = bot.getNextCell(table);
    table[botMove.row][botMove.col] = playerFlags.computer;
    playStack.push(botMove);

    // Test user moves only if computer didn't already win
    if (playerWon(table, playerFlags.computer))
      pass('Bot Won');
    else 
      testAllPossibleOutcomesUserGoesNext(table, playStack);

    // Reset table
    table[botMove.row][botMove.col] = playerFlags.none;
    playStack.pop();
  }
}

// Tests all possible outcomes when the user goes next
function testAllPossibleOutcomesUserGoesNext(table, playStack) {
  for (var r = 0; r < table.length; r++) {
    for (var c = 0; c < table[r].length; c++) {
      if (table[r][c] === playerFlags.none) {
        table[r][c] = playerFlags.user;
        playStack.push(new Cell(r, c));
        testAllPossibleOutcomesBotGoesNext(table, playStack);
        table[r][c] = playerFlags.none;
        playStack.pop();
      }
    }
  }
}

// True if all cells are taken
function gameIsDraw(table) {
  for (var r = 0; r < table.length; r++)
    for (var c = 0; c < table[r].length; c++)
      if (table[r][c] === playerFlags.none)
        return false;
  return true;
}

// True if flag has 3 in a row
function playerWon(table, flag) {
  for (var i = 0; i < table.length; i++)
    if (hasFullRow(table, i, flag) 
      || hasFullColumn(table, i, flag))
      return true;
  return hasTopDiagonal(table, flag)
    || hasBottomDiagonal(table, flag);
}

// True if all values in a row equal the flag
function hasFullRow(table, row, flag) {
  for (var col = 0; col < table[row].length; col++)
    if (table[row][col] !== flag)
      return false;
  return true;
}

// True if all vaues in a column equal the flag
function hasFullColumn(table, col, flag) {
  for (var row = 0; row < table.length; row++)
    if (table[row][col] !== flag)
      return false;
  return true;
}

// True if all values in the top diagonal equal the flag
function hasTopDiagonal(table, flag) {
  for (var i = 0; i < table.length; i++)
    if (table[i][i] !== flag)
      return false;
  return true;
}

// True if all values in the bottom diagonal equal the flag
function hasBottomDiagonal(table, flag) {
  var row = table.length - 1;
  var col = 0;
  while (row >= 0 && col < table.length)
    if (table[row--][col--] !== flag)
      return false;
  return true;
}