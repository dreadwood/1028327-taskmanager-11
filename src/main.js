import SiteMenu from './components/site-menu.js';
import Filter from './components/filter.js';
import Board from './components/board.js';
import Sorting from './components/sorting.js';
import Task from './components/task.js';
import TasksContainer from './components/tasks-container.js';
import TaskEdit from './components/task-edit.js';
import LoadMore from './components/load-more.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const taskComponent = new Task(task);

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (bordCompanent, tasks) => {
  render(bordCompanent.getElement(), new Sorting().getElement(), RenderPosition.BEFOREEND);
  render(bordCompanent.getElement(), new TasksContainer().getElement(), RenderPosition.BEFOREEND);

  const taskListElement = bordCompanent.getElement().querySelector(`.board__tasks`);

  const TaskEditComponent = new TaskEdit(tasks[0]);
  render(taskListElement, TaskEditComponent.getElement(), RenderPosition.BEFOREEND);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(1, showingTasksCount).forEach((task) => {
    renderTask(taskListElement, task);
  });

  const loadMoreButtonComponent = new LoadMore();
  render(bordCompanent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

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

render(siteHeaderElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Filter(filters).getElement(), RenderPosition.BEFOREEND);

const bordCompanent = new Board();
render(siteMainElement, bordCompanent.getElement(), RenderPosition.BEFOREEND);
renderBoard(bordCompanent, tasks);
