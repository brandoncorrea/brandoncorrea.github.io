function Navigation() {
  this.pages = {
    home: 'home',
    game: 'game'
  }

  this.showHome = () => {
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