import AbstractComponent from '../abstract-component.js';

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
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

  getTemplate() {
    const filterMarkup = this._filters.map((it, i) => this._createFilterMarkup(it, i === 0)).join(`\n`);

    return (
      `<section class="main__filter filter container">
        ${filterMarkup}
      </section>`
    );
  }
}
