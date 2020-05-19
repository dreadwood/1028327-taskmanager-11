import SiteMenu, {MenuItem} from './components/menu/site-menu.js';
import FilterController from './controllers/filter.js';
import Board from './components/board/board.js';
import BoardController from './controllers/board.js';
import Statistics from './components/statistics/statistics.js';
import TasksModel from './models/tasks.js';
import {generateTasks} from './mock/task.js';
import {render} from './utils/render.js';

const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenu();
render(siteHeaderElement, siteMenuComponent);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new Board();
render(siteMainElement, boardComponent);
const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const statisticsComponent = new Statistics(tasksModel, dateFrom, dateTo);
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
