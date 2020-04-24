import {createElement} from '../../utils/utils.js';

const createSiteMenuMarkup = (menuItem) => {
  const [type, name] = menuItem;
  return (
    `<input
      type="radio"
      name="control"
      id="control__${type}"
      class="control__input visually-hidden"
    />
    <label for="control__${type}" class="control__label ${type === `new-task` ? `control__label--new-task` : ``}">
      ${name}
    </label>`
  );
};

const createSiteMenuTemplate = () => {
  const menuItems = new Map([
    [`new-task`, `+ ADD NEW TASK`],
    [`task`, `TASKS`],
    [`statistic`, `STATISTICS`],
  ]);

  const siteMenuMarkup = () => [...menuItems].map((it) => createSiteMenuMarkup(it)).join(`\n`);

  return (
    `<section class="control__btn-wrap">
      ${siteMenuMarkup()}
    </section>`
  );
};

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate();
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
