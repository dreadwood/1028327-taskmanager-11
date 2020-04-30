import Sorting from '../components/filter/sorting.js';
import Task from '../components/task/task.js';
import TasksContainer from '../components/task/tasks-container.js';
import TaskEdit from '../components/task/task-edit.js';
import LoadMore from '../components/board/load-more.js';
import NoTasks from '../components/task/no-tasks.js';
import {render, replace, remove} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
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
  taskComponent.setEditButtonClickHandler((evt) => {
    evt.preventDefault();
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEdit(task);
  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasks();
    this._sortingComponent = new Sorting();
    this._tasksContainerComponent = new TasksContainer();
    this._loadMoreButtonComponent = new LoadMore();
  }

  render(tasks) {
    const isAllTasksArhived = tasks.every((task) => task.isArhive);
    if (isAllTasksArhived) {
      render(this._container.getElement(), this._noTasksComponent);
      return;
    }

    render(this._container.getElement(), this._sortingComponent);
    render(this._container.getElement(), this._tasksContainerComponent);

    const taskListElement = this._container.getElement().querySelector(`.board__tasks`);

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount).forEach((task) => {
      renderTask(taskListElement, task);
    });

    render(this._container.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => {
        renderTask(taskListElement, task);
      });

      if (showingTasksCount > tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }
}
