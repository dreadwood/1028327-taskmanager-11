import AbstractComponent from '../abstract-component.js';

const menuItems = new Map([
  [`new-task`, `+ ADD NEW TASK`],
  [`task`, `TASKS`],
  [`statistic`, `STATISTICS`],
]);

const MenuItem = {
  NEW_TASK: `control__new-task`,
  STATISTICS: `control__statistic`,
  TASKS: `control__task`,
};

export default class SiteMenu extends AbstractComponent {
  getTemplate() {
    const siteMenuMarkup = () => [...menuItems].map((it) => this._createSiteMenuMarkup(it)).join(`\n`);

    return (
      `<section class="control__btn-wrap">
        ${siteMenuMarkup()}
      </section>`
    );
  }

  setActiveItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item) {
      item.checked = true;
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }

  _createSiteMenuMarkup(menuItem) {
    const [type, name] = menuItem;
    return (
      `<input
        type="radio"
        name="control"
        id="control__${type}"
        class="control__input visually-hidden"
        ${type === `task` ? `checked` : ``}
      />
      <label for="control__${type}" class="control__label ${type === `new-task` ? `control__label--new-task` : ``}">
        ${name}
      </label>`
    );
  }
}

export {MenuItem};
