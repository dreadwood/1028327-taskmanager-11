import {MONTH_NAMES, DAYS, COLORS} from '../../utils/const.js';
import {formatTime} from '../../utils/common.js';
import AbstractSmartComponent from '../abstract-smart-component.js';

export default class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._submitHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    const {description, dueDate, color} = this._task;

    const isBlockSaveButton = (this._isDateShowing && this._isRepeatingTask) || (this._isRepeatingTask && this._isRepeating(this._activeRepeatingDays));

    const date = (this._isDateShowing && dueDate) ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
    // const date = (this._isDateShowing && dueDate) ? formatDate(dueDate) : ``;

    const time = (this._isDateShowing && dueDate) ? formatTime(dueDate) : ``;
    const colorsMarkup = this._createColorsMarkup(COLORS, color);
    const repeatingDaysMarkup = this._createRepeatingDaysMarkup(DAYS, this._activeRepeatingDays);

    return (
      `<article class="card card--edit card--${color} ${this._getRepeatClass()} ${this._getDeadlineClass(dueDate)}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${description}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status"
                      >${this._isDateShowing ? `yes` : `no`}</span>
                  </button>

                  ${this._isDateShowing ? `<fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder=""
                        name="date"
                        value="${date} ${time}"
                      />
                    </label>
                  </fieldset>` : ``}

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${this._isRepeatingTask ? `yes` : `no`}</span>
                  </button>

                  ${this._isRepeatingTask ? `<fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                      ${repeatingDaysMarkup}
                    </div>
                  </fieldset>` : ``}
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${colorsMarkup}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`
    );
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._isDateShowing = !this._isDateShowing;

      this.rerender();
    });

    element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._isRepeatingTask = !this._isRepeatingTask;

      this.rerender();
    });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        evt.preventDefault();
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }
  }

  _isRepeating(repeatingDays) {
    return Object.values(repeatingDays).some(Boolean);
  }

  _getDeadlineClass(dueDate) {
    return dueDate instanceof Date && dueDate < Date.now()
      ? `card--deadline`
      : ``;
  }

  _getRepeatClass() { // change class method
    return this._isRepeatingTask
      ? `card--repeat`
      : ``;
  }

  _createColorsMarkup(colors, currentColor) {
    return colors.map((color, index) => {
      return (
        `<input
          type="radio"
          id="color-${color}-${index}"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${currentColor === color ? `checked` : ``}
        />
        <label
          for="color-${color}-${index}"
          class="card__color card__color--${color}"
          >${color}</label
        >`
      );
    }).join(`\n`);
  }

  _createRepeatingDaysMarkup(days, repeatingDays) {
    return days.map((day, index) => {
      const isChecked = repeatingDays[day];
      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-${index}"
          name="repeat"
          value="${day}"
          ${isChecked ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-${index}"
          >${day}</label
        >`
      );
    }).join(`\n`);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }
}
