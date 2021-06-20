class SettingsRepository {
  keyNames = {
    playerIcon: 'playerIcon',
    computerIcon: 'computerIcon',
    playerGoesFirst: 'playerGoesFirst'
  }

  // Getters
  getPlayerIcon() {
    var icon = localStorage.getItem(this.keyNames.playerIcon);
    if (icon !== null)
      return icon;
    
    if (localStorage.getItem(this.keyNames.computerIcon) === 'X')
      this.setPlayerIcon('O');
    else
      this.setPlayerIcon('X');

    return this.getPlayerIcon();
  }

  getComputerIcon() {
    var icon = localStorage.getItem(this.keyNames.computerIcon);
    if (icon !== null)
      return icon;

    if (localStorage.getItem(this.keyNames.playerIcon) === 'X')
      this.setComputerIcon('O');
    else
      this.setComputerIcon('X');
    
    return this.getComputerIcon();
  }

  getPlayerGoesFirst() {
    var flag = localStorage.getItem(this.keyNames.playerGoesFirst);
    return flag !== null && flag.toLowerCase() === 'true';
  }
  
  // Setters
  setPlayerIcon = icon => localStorage.setItem(this.keyNames.playerIcon, icon);
  setComputerIcon = icon => localStorage.setItem(this.keyNames.computerIcon, icon);
  setPlayerGoesFirst = flag => localStorage.setItem(this.keyNames.playerGoesFirst, flag);

  constructor() {
  }
}