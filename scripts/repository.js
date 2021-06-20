const getItem = name => 
  localStorage.getItem(name);
const setItem = (name, value) => 
  localStorage.setItem(name, value);

// Setters
const setPlayerGoesFirst = value => 
  setItem("playerGoesFirst", value);
const setUserIcon = icon => 
  setItem("userIcon", icon);

// Getters
function getPlayerGoesFirst() {
  var flag = getItem("playerGoesFirst");
  if (flag === 'true' || flag === 'false')
    return flag.toLowerCase() === 'true';
  setPlayerGoesFirst(true);
  return getPlayerGoesFirst();
}

function getUserIcon() {
  var icon = getItem("userIcon");
  if (icon === 'X' || icon === 'O')
    return icon;
  setUserIcon('X');
  return getUserIcon();
} 

function getComputerIcon() {
  var icon = getUserIcon();
  if (icon === 'X')
    return 'O';
  return 'X';
}