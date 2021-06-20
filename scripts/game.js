function onSquareClicked(event) {
  // Square is already taken - do nothing.
  // if (event.target.innerHTML !== '')
  //   return;
  // Game.chooseSquare(
  //   Number(event.target.id[event.target.id.length - 2]), 
  //   Number(event.target.id[event.target.id.length - 1]));
}

function onQuitGameClicked() {
  Nav.showHome();
}
