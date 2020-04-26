import {createElement} from '../../utils/utils.js';

const sortTypes = new Map([
  [`default`, `SORT BY DEFAULT`],
  [`date-up`, `SORT BY DATE up`],
  [`date-down`, `SORT BY DATE down`],
]);

const createSortingMarkup = (sorting) => {
  const [type, name] = sorting;
  return (
    `<a href="#" class="board__filter" data-sort-type="${type}">${name}</a>`
  );
};

export default class sorting {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    const sortingMarkup = () => [...sortTypes].map((it) => createSortingMarkup(it)).join(`\n`);

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
