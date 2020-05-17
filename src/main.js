import SiteMenu from './components/menu/site-menu.js';
import Filter from './components/filter/filter.js';
import Board from './components/board/board.js';
import BoardController from './controllers/board.js';
import TasksModel from './models/tasks.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render} from './utils/render.js';

const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);
const filters = generateFilters();

render(siteHeaderElement, new SiteMenu());
render(siteMainElement, new Filter(filters));

const bordCompanent = new Board();
const boardController = new BoardController(bordCompanent, tasksModel);
render(siteMainElement, bordCompanent);
boardController.render();
