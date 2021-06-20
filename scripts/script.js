const SettingsRepo = new SettingsRepository();
const Game = new TicTacToe(SettingsRepo);

function navigate(path) {
  hide('home');
  hide('game');
  show(path);
}

const hide = id => setDisplay(id, 'none');
const show = id => setDisplay(id, 'block');
const check = id => setChecked(id, true);
const uncheck = id => setChecked(id, false);

const setChecked = (id, value) =>
  document.getElementById(id).checked = value;
const setDisplay = (id, value) =>
  document.getElementById(id).style.display = value;

const addClass = (id, className) =>
  document.getElementById(id).classList.add(className);
const removeClass = (id, className) =>
  document.getElementById(id).classList.remove(className);

const togglePositiveClass = (id, flag) =>
  flag 
  ? addClass(id, 'positive')
  : removeClass(id, 'positive');

window.onload = function(e) {
  console.log('Version: 1.0.0');
  var iconIsX = SettingsRepo.getPlayerIcon() === 'X';
  togglePositiveClass('userIconO', !iconIsX);
  togglePositiveClass('userIconX', iconIsX);

  var playerGoesFirst = SettingsRepo.getPlayerGoesFirst();
  togglePositiveClass('playerButton', playerGoesFirst);
  togglePositiveClass('computerButton', !playerGoesFirst);
}
