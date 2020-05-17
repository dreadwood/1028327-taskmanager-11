import Sorting, {SortTypes} from '../components/filter/sorting.js';
import TasksContainer from '../components/task/tasks-container.js';
import LoadMore from '../components/board/load-more.js';
import NoTasks from '../components/task/no-tasks.js';
import TaskController from './task.js';
import {render, remove} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._noTasksComponent = new NoTasks();
    this._sortingComponent = new Sorting();
    this._tasksContainerComponent = new TasksContainer();
    this._loadMoreButtonComponent = new LoadMore();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {
    const containerElement = this._container.getElement();
    const tasks = this._tasksModel.getTasks();
    const isAllTasksArhived = tasks.every((task) => task.isArhive);


    if (isAllTasksArhived) {
      render(containerElement, this._noTasksComponent);
      return;
    }

    render(containerElement, this._sortingComponent);
    render(containerElement, this._tasksContainerComponent);

    this.renderTasks(tasks.slice(0, this._showingTasksCount));

    this._renderLoadMoreButton();
  }

  renderTasks(tasks) {
    const taskListElement = this._tasksContainerComponent.getElement();

    const newTasks = this._renderTasks(taskListElement, tasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._showingTasksCount = this._showedTaskControllers.length;
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

  _renderTasks(taskListElement, tasks, onDataChange, onViewChange) {
    return tasks.map((task) => {
      const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
      taskController.render(task);

      return taskController;
    });
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount > this._tasksModel.getTasks().length) {
      return;
    }

    const containerElement = this._container.getElement();
    render(containerElement, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const tasks = this._tasksModel.getTasks();
      const taskListElement = this._tasksContainerComponent.getElement();
      this._showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = this._getSortedTasks(tasks, this._sortingComponent.getSortType(), prevTasksCount, this._showingTasksCount);
      const newTasks = this._renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);

      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

    if (isSuccess) {
      taskController.render(newData);
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const sortedTasks = this._getSortedTasks(this._tasksModel.getTasks(), sortType, 0, this._showingTasksCount);
    const taskListElement = this._tasksContainerComponent.getElement();

    taskListElement.innerHTML = ``;

    const newTasks = this._renderTasks(taskListElement, sortedTasks, this._onDataChange);
    this._showedTaskControllers = newTasks;

    this._renderLoadMoreButton();
  }
}
