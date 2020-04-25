import {createElement} from '../../utils/utils.js';

export default class TasksContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<div class="board__tasks"></div>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}