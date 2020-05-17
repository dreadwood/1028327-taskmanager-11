import AbstractComponent from '../abstract-component.js';

const FILTER_ID_PREFIX = `filter__`;

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    const filterMarkup = this._filters.map((it) => this._createFilterMarkup(it, it.checked)).join(`\n`);

    return (
      `<section class="main__filter filter container">
        ${filterMarkup}
      </section>`
    );
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = this._getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }

  _createFilterMarkup(filter, isChecked) {
    const {name, count} = filter;

    return (
      `<input
          type="radio"
          id="filter__${name}"
          class="filter__input visually-hidden"
          name="filter"
          ${isChecked ? `checked` : ``}
        />
        <label for="filter__${name}" class="filter__label">
          ${name} <span class="filter__${name}-count">${count}</span>
        </label>`
    );
  }

  _getFilterNameById(id) {
    return id.substring(FILTER_ID_PREFIX.length);
  }
}
