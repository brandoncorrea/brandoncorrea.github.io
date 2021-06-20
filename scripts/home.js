function onNewGameClicked() {
  alert('onNewGameClicked');
  // Game.newGame();
  // Game.updateGameBoard();
  // Nav.showGame();
}

function onIconChanged(icon) {
  alert('onIconChanged');
  // Settings.setPlayerIcon(icon);
  // var iconIsX = Settings.getPlayerIcon() === 'X';

  // // Update computer icon
  // if (iconIsX)
  //   Settings.setComputerIcon('O');
  // else
  //   Settings.setComputerIcon('X');

  // togglePositiveClass('userIconO', !iconIsX);
  // togglePositiveClass('userIconX', iconIsX);
}

function onFirstPlayerChanged(flag) {
  alert('onFirstPlayerChanged');
  // Settings.setPlayerGoesFirst(flag);
  // var playerGoesFirst = Settings.getPlayerGoesFirst();
  // togglePositiveClass('computerButton', !playerGoesFirst);
  // togglePositiveClass('playerButton', playerGoesFirst);
}
