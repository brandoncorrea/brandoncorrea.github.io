function createNewGame() {
  Game.newGame();
  Nav.showGame();
}

function updateIcon(icon) {
  Settings.setPlayerIcon(icon);
  var iconIsX = Settings.getPlayerIcon() === 'X';
  if (iconIsX)
    Settings.setComputerIcon('O');
  else
    Settings.setComputerIcon('X');

  togglePositiveClass('userIconO', !iconIsX);
  togglePositiveClass('userIconX', iconIsX);
}

function updatePlayerGoesFirst(flag) {
  Settings.setPlayerGoesFirst(flag);
  var playerGoesFirst = Settings.getPlayerGoesFirst();
  togglePositiveClass('computerButton', !playerGoesFirst);
  togglePositiveClass('playerButton', playerGoesFirst);
}
