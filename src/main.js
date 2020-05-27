import BoardComponent from './components/board-component.js';
import SiteMenuComponent, {MenuItem} from './components/site-menu-component.js';
import StatisticsComponent from './components/statistics-component.js';
import BoardController from './controllers/board.js';
import FilterController from './controllers/filter.js';
import TasksModel from './models/tasks.js';
import {render} from './utils/render.js';
import {generateTasks} from './mock/task.js';

const TASK_COUNT = 20;

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();

tasksModel.setTasks(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent(tasksModel, dateFrom, dateTo);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);
const filterController = new FilterController(siteMainElement, tasksModel);

render(siteHeaderElement, siteMenuComponent);
filterController.render();
render(siteMainElement, boardComponent);
boardController.render();
render(siteMainElement, statisticsComponent);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      statisticsComponent.show();
      boardController.hide();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});
