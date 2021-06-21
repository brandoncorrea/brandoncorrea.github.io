const Scores = new ScoreRepository();
const Nav = new Navigation(Scores);
const Settings = new SettingsRepository();
const Game = new GameUI(Settings, Scores);

const addClass = (id, className) =>
  document.getElementById(id).classList.add(className);
const removeClass = (id, className) =>
  document.getElementById(id).classList.remove(className);
const togglePositiveClass = (id, flag) =>
  flag 
  ? addClass(id, 'positive')
  : removeClass(id, 'positive');

window.onload = function() {
  var iconIsX = Settings.getPlayerIcon() === 'X';
  togglePositiveClass('userIconO', !iconIsX);
  togglePositiveClass('userIconX', iconIsX);

  var playerGoesFirst = Settings.getPlayerGoesFirst();
  togglePositiveClass('playerButton', playerGoesFirst);
  togglePositiveClass('computerButton', !playerGoesFirst);
  Nav.showHome();
};