function refreshTable() {
  for (var r = 0; r < Game.table.length; r++)
    for (var c = 0; c < Game.table[r].length; c++) {
      var el = document.getElementById(`square_${r}${c}`);
      if (Game.table[r][c] === 0)
        el.onclick = chooseSquare;
      else
        el.onclick = function() {};
    }
  
  Game.updateGameBoard();
}

function chooseSquare(event) {
  var row = Number(event.target.id[event.target.id.length - 2]);
  var col = Number(event.target.id[event.target.id.length - 1]);
  Game.takePlayerTurn(row, col);

  if (!Game.gameIsOver())
    Game.takeComputerTurn();
  
  refreshTable();
  if (Game.gameIsOver())
    alert('Game Over');
}
