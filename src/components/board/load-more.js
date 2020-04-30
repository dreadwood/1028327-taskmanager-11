import AbstractComponent from '../abstract-component.js';

export default class LoadMore extends AbstractComponent {
  getTemplate() {
    return (
      `<button class="load-more" type="button">load more</button>`
    );
  }
}
