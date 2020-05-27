import AbstractComponent from './abstract-component.js';

const SortTypes = new Map([
  [`SORT BY DEFAULT`, `default`],
  [`SORT BY DATE up`, `date-up`],
  [`SORT BY DATE down`, `date-down`],
]);

export default class SortingComponent extends AbstractComponent {
  constructor() {
    super();

    this._currenSortType = `default`;
  }

  getSortType() {
    return this._currenSortType;
  }

  getTemplate() {
    const sortingMarkup = () => [...SortTypes].map((it) => this._createSortingMarkup(it)).join(`\n`);

    return (
      `<div class="board__filter-list">
        ${sortingMarkup()}
      </div>`
    );
  }

  _createSortingMarkup(sorting) {
    const [name, dataset] = sorting;
    return (
      `<a href="#" class="board__filter" data-sort-type="${dataset}">${name}</a>`
    );
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;
      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      handler(this._currenSortType);
    });
  }
}

export {SortTypes};
