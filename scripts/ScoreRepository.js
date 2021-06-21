function ScoreRepository() {
  this.keyNames = {
    wins: 'wins',
    losses: 'losses',
    draws: 'draws'
  }
  
  this.getNumber = name => {
    var val = Number(localStorage.getItem(name));
    if (val !== undefined)
      return val;
    // Default numbers to 0
    localStorage.setItem(name, 0);
    return this.getNumber(name);
  }
  
  this.getWins = () => this.getNumber(this.keyNames.wins);
  this.getLosses = () => this.getNumber(this.keyNames.losses);
  this.getDraws = () => this.getNumber(this.keyNames.draws);

  this.addWin = () => localStorage.setItem(this.keyNames.wins, this.getWins() + 1);
  this.addLoss = () => localStorage.setItem(this.keyNames.losses, this.getLosses() + 1);
  this.addDraw = () => localStorage.setItem(this.keyNames.draws, this.getDraws() + 1);
}