import {createElement} from "../utils.js";

const createSortingMarkup = (sorting) => {
  const {type, name} = sorting;
  return (
    `<a href="#" class="board__filter" data-sort-type="${type}">${name}</a>`
  );
};

const createSortingTemplate = () => {
  const sortTypes = [
    {
      type: `default`,
      name: `SORT BY DEFAULT`
    },
    {
      type: `date-up`,
      name: `SORT BY DATE up`
    },
    {
      type: `date-down`,
      name: `SORT BY DATE down`
    }];

  const sortingMarkup = sortTypes.map((it) => createSortingMarkup(it)).join(`\n`);

  return (
    `<div class="board__filter-list">
      ${sortingMarkup}
    </div>`
  );
};

export class sorting {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortingTemplate();
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
