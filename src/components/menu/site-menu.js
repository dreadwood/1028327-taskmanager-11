import AbstractComponent from '../abstract-component.js';

const menuItems = new Map([
  [`new-task`, `+ ADD NEW TASK`],
  [`task`, `TASKS`],
  [`statistic`, `STATISTICS`],
]);

export default class SiteMenu extends AbstractComponent {
  _createSiteMenuMarkup(menuItem) {
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
  }

  getTemplate() {
    const siteMenuMarkup = () => [...menuItems].map((it) => this._createSiteMenuMarkup(it)).join(`\n`);

    return (
      `<section class="control__btn-wrap">
        ${siteMenuMarkup()}
      </section>`
    );
  }
}
