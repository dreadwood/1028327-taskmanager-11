import AbstractComponent from './abstract-component.js';

export default class BoardComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="board container"></section>`
    );
  }
}
