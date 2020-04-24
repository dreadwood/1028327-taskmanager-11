import {createElement} from '../../utils/utils.js';

const createTasksContainerTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class TasksContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTasksContainerTemplate();
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
