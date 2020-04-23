import {createElement} from "../utils.js";

const createBoardTemplate = () => {
  return (
    `<section class="board container">
      <div class="board__tasks"></div>
    </section>`
  );
};

export class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(createBoardTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
