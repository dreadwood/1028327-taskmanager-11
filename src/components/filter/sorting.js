import {createElement} from '../../utils/utils.js';

const sortTypes = new Map([
  [`default`, `SORT BY DEFAULT`],
  [`date-up`, `SORT BY DATE up`],
  [`date-down`, `SORT BY DATE down`],
]);

export default class sorting {
  constructor() {
    this._element = null;
  }

  _createSortingMarkup(sorting) {
    const [type, name] = sorting;
    return (
      `<a href="#" class="board__filter" data-sort-type="${type}">${name}</a>`
    );
  }

  getTemplate() {
    const sortingMarkup = () => [...sortTypes].map((it) => this._createSortingMarkup(it)).join(`\n`);

    return (
      `<div class="board__filter-list">
        ${sortingMarkup()}
      </div>`
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
