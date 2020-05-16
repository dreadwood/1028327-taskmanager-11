import {COLORS} from '../utils/const.js';
import {getRandomDate, getRandomArrayItems} from '../utils/common.js';

const TASK_DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
  `Погладить кота`
];

const DEFAULT_REPEATING_DAYS = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

const getRandomRepeating = () => {
  return Object.assign({}, DEFAULT_REPEATING_DAYS, {mo: Math.random() > 0.5});
};

const generationTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    description: getRandomArrayItems(TASK_DESCRIPTIONS),
    dueDate,
    color: getRandomArrayItems(COLORS),
    repeatingDays: dueDate ? DEFAULT_REPEATING_DAYS : getRandomRepeating(),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generationTask);
};

export {generateTasks};
