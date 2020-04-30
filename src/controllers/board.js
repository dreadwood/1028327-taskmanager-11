import Sorting, {SortTypes} from '../components/filter/sorting.js';
import Task from '../components/task/task.js';
import TasksContainer from '../components/task/tasks-container.js';
import TaskEdit from '../components/task/task-edit.js';
import LoadMore from '../components/board/load-more.js';
import NoTasks from '../components/task/no-tasks.js';
import {render, replace, remove} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasks();
    this._sortingComponent = new Sorting();
    this._tasksContainerComponent = new TasksContainer();
    this._loadMoreButtonComponent = new LoadMore();
  }

  _renderTask(taskListElement, task) {
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
  }

  _renderTasks(taskListElement, tasks) {
    tasks.forEach((task) => this._renderTask(taskListElement, task));
  }

  _getSortedTasks(tasks, sortType, from, to) {
    let sortedTasks = [];
    const showingTasks = tasks.slice();

    switch (sortType) {
      case SortTypes.get(`SORT BY DATE up`):
        sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortTypes.get(`SORT BY DATE down`):
        sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortTypes.get(`SORT BY DEFAULT`):
        sortedTasks = showingTasks;
        break;
    }

    return sortedTasks.slice(from, to);
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (showingTasksCount > tasks.length) {
        return;
      }

      render(containerElement, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;
        const sortedTasks = this._getSortedTasks(tasks, this._sortingComponent.getSortType(), prevTasksCount, showingTasksCount);

        this._renderTasks(taskListElement, sortedTasks);

        if (showingTasksCount > tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const containerElement = this._container.getElement();
    const isAllTasksArhived = tasks.every((task) => task.isArhive);

    if (isAllTasksArhived) {
      render(containerElement, this._noTasksComponent);
      return;
    }

    render(containerElement, this._sortingComponent);
    render(containerElement, this._tasksContainerComponent);

    const taskListElement = this._tasksContainerComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._renderTasks(taskListElement, tasks.slice(0, showingTasksCount));

    renderLoadMoreButton();

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = this._getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
      this._renderTasks(taskListElement, sortedTasks);

      renderLoadMoreButton();
    });
  }
}
