function createNewGame() {
  Game.newGame();
  navigate('game');
}

function updateIcon(icon) {
  SettingsRepo.setPlayerIcon(icon);
  var iconIsX = SettingsRepo.getPlayerIcon() === 'X';
  if (iconIsX)
    SettingsRepo.setComputerIcon('O');
  else
    SettingsRepo.setComputerIcon('X');

  togglePositiveClass('userIconO', !iconIsX);
  togglePositiveClass('userIconX', iconIsX);
}

function updatePlayerGoesFirst(flag) {
  SettingsRepo.setPlayerGoesFirst(flag);
  var playerGoesFirst = SettingsRepo.getPlayerGoesFirst();
  togglePositiveClass('computerButton', !playerGoesFirst);
  togglePositiveClass('playerButton', playerGoesFirst);
}