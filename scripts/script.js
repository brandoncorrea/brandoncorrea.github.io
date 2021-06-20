const Nav = new Navigation();
const Settings = new SettingsRepository();
const Game = new GameUI(Settings);

const addClass = (id, className) =>
  document.getElementById(id).classList.add(className);
const removeClass = (id, className) =>
  document.getElementById(id).classList.remove(className);
const togglePositiveClass = (id, flag) =>
  flag 
  ? addClass(id, 'positive')
  : removeClass(id, 'positive');

window.onload = function() {
  console.log('Version: 1.0.1');
  var iconIsX = Settings.getPlayerIcon() === 'X';
  togglePositiveClass('userIconO', !iconIsX);
  togglePositiveClass('userIconX', iconIsX);

  var playerGoesFirst = Settings.getPlayerGoesFirst();
  togglePositiveClass('playerButton', playerGoesFirst);
  togglePositiveClass('computerButton', !playerGoesFirst);
};