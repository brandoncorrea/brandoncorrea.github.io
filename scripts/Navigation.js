function Navigation(scoreRepository) {
  this.pages = {
    home: 'home',
    game: 'game'
  }

  this.showHome = () => {
    document.getElementById('winsLabel').innerHTML = scoreRepository.getWins();
    document.getElementById('drawsLabel').innerHTML = scoreRepository.getDraws();
    document.getElementById('lossesLabel').innerHTML = scoreRepository.getLosses();
    this.show(this.pages.home);
    this.hide(this.pages.game);
  }

  this.showGame = () => {
    this.hide(this.pages.home);
    this.show(this.pages.game);
  }

  this.hide = id => document.getElementById(id).style.display = 'none';
  this.show = id => document.getElementById(id).style.display = 'block';
}