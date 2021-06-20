class Navigation {
  pages = {
    home: 'home',
    game: 'game'
  }

  showHome() {
    this.show(this.pages.home);
    this.hide(this.pages.game);
  }

  showGame() {
    this.hide(this.pages.home);
    this.show(this.pages.game);
  }

  hide = id => setDisplay(id, 'none');
  show = id => setDisplay(id, 'block');

  constructor() {
  }
}