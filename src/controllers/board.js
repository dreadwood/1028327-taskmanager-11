import LoadMoreButtonComponent from '../components/load-more-button-component.js';
import NoTasksComponent from '../components/no-tasks-component.js';
import SortingComponent, {SortTypes} from '../components/sorting-component.js';
import TasksContainerComponent from '../components/tasks-container-component.js';
import TaskController, {TaskControllerMode, EmptyTask} from './task.js';
import {render, remove} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
    taskController.render(task, TaskControllerMode.DEFAULT);

    return taskController;
  });
};

export default class BoardController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    this._noTasksComponent = new NoTasksComponent();
    this._sortingComponent = new SortingComponent();
    this._tasksContainerComponent = new TasksContainerComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();

    this._creatingTask = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
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

    this._renderTasks(tasks.slice(0, this._showingTasksCount));

    this._renderLoadMoreButton();
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const taskListElement = this._tasksContainerComponent.getElement();
    this._creatingTask = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingTask.render(EmptyTask, TaskControllerMode.ADDING);
  }

  _removeTasks() {
    this._showedTaskControllers.forEach((taskController) => taskController.destroy());
    this._showedTaskControllers = [];
  }

  _renderTasks(tasks) {
    const taskListElement = this._tasksContainerComponent.getElement();

    const newTasks = renderTasks(taskListElement, tasks, this._onDataChange, this._onViewChange);
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

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
      return;
    }

    const containerElement = this._container.getElement();
    render(containerElement, this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getTasks().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    if (oldData === EmptyTask) {
      this._creatingTask = null;
      if (newData === null) {
        taskController.destroy();
        this._updateTasks(this._showingTasksCount);
      } else {
        this._tasksModel.addTask(newData);
        taskController.render(newData, TaskControllerMode.DEFAULT);

        if (this._showingTasksCount % SHOWING_TASKS_COUNT_BY_BUTTON === 0) {
          const destroyedTask = this._showedTaskControllers.pop();
          destroyedTask.destroy();
        }

        this._showedTaskControllers = [].concat(taskController, this._showedTaskControllers);
        this._showingTasksCount = this._showedTaskControllers.length;

        this._renderLoadMoreButton();
      }
    } else if (newData === null) {
      this._tasksModel.removeTask(oldData.id);
      this._updateTasks(this._showingTasksCount);
    } else {
      const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

      if (isSuccess) {
        taskController.render(newData, TaskControllerMode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    const sortedTasks = this._getSortedTasks(this._tasksModel.getTasks(), sortType, 0, this._showingTasksCount);

    this._removeTasks();
    this._renderTasks(sortedTasks);

    this._renderLoadMoreButton();
  }

  _onLoadMoreButtonClick() {
    const prevTasksCount = this._showingTasksCount;
    const tasks = this._tasksModel.getTasks();


    this._showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = this._getSortedTasks(tasks, this._sortingComponent.getSortType(), prevTasksCount, this._showingTasksCount);
    this._renderTasks(sortedTasks);

    if (this._showingTasksCount >= sortedTasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateTasks(SHOWING_TASKS_COUNT_ON_START);
  }
}
