import AbstractComponent from '../abstract-component.js';

export default class LoadMore extends AbstractComponent {
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  getTemplate() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }
}
