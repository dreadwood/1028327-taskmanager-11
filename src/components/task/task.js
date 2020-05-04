import {MONTH_NAMES} from '../../utils/const.js';
import {formatTime} from '../../utils/common.js';
import AbstractComponent from '../abstract-component.js';

export default class Task extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    const {description, dueDate, color, repeatingDays} = this._task;

    const isDateShowing = !!dueDate;
    const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
    const time = isDateShowing ? formatTime(dueDate) : ``;
    const editButton = this._createButtonMarkup(`edit`);
    const archiveButton = this._createButtonMarkup(`archive`, !this._task.isArchive);
    const favoritesButton = this._createButtonMarkup(`favorites`, !this._task.isFavorite);

    return (
      `<article class="card card--${color} ${this._getRepeatClass(repeatingDays)} ${this._getDeadlineClass(dueDate)}">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              ${editButton}
              ${archiveButton}
              ${favoritesButton}
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <p class="card__text">${description}</p>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <div class="card__date-deadline">
                    <p class="card__input-deadline-wrap">
                      <span class="card__date">${date}</span>
                      <span class="card__time">${time}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>`
    );
  }

  _createButtonMarkup(name, isActive = true) {
    return (
      `<button type="button" class="card__btn card__btn--${name} ${isActive ? `` : `card__btn--disabled`}">
        ${name}
      </button>`
    );
  }

  _getDeadlineClass(dueDate) {
    return dueDate instanceof Date && dueDate < Date.now()
      ? `card--deadline`
      : ``;
  }

  _getRepeatClass(repeatingDays) {
    return Object.values(repeatingDays).some(Boolean)
      ? `card--repeat`
      : ``;
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, handler);
  }
}
