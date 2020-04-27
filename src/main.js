import SiteMenu from './components/menu/site-menu.js';
import Filter from './components/filter/filter.js';
import Board from './components/board/board.js';
import Sorting from './components/filter/sorting.js';
import Task from './components/task/task.js';
import TasksContainer from './components/task/tasks-container.js';
import TaskEdit from './components/task/task-edit.js';
import LoadMore from './components/board/load-more.js';
import NoTasks from './components/task/no-tasks.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render} from './utils/utils.js';

const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      evt.preventDefault();
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new Task(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEdit(task);
  const editForm = taskEditComponent.getElement().querySelector(`.card__save`);
  editForm.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement());
};

const renderBoard = (bordCompanent, tasks) => {
  const isAllTasksArhived = tasks.every((task) => task.isArhive);
  if (isAllTasksArhived) {
    render(bordCompanent.getElement(), new NoTasks().getElement());
    return;
  }

  render(bordCompanent.getElement(), new Sorting().getElement());
  render(bordCompanent.getElement(), new TasksContainer().getElement());

  const taskListElement = bordCompanent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => {
    renderTask(taskListElement, task);
  });

  const loadMoreButtonComponent = new LoadMore();
  render(bordCompanent.getElement(), loadMoreButtonComponent.getElement());

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => {
      renderTask(taskListElement, task);
    });

    if (showingTasksCount > tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenu().getElement());
render(siteMainElement, new Filter(filters).getElement());

const bordCompanent = new Board();
render(siteMainElement, bordCompanent.getElement());
renderBoard(bordCompanent, tasks);
