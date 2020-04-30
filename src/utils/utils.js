const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFOR_EEND: `beforeend`,
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenderPosition.BEFOR_EEND) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOR_EEND:
      container.append(element);
      break;
  }
};

const getRandomSign = () => Math.random() > 0.5 ? 1 : -1;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItems = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomSign() * getRandomIntegerNumber(0, 8);
  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getRepeatClass = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean)
    ? `card--repeat`
    : ``;
};

export {formatTime, createElement, render, RenderPosition, getRandomIntegerNumber, getRandomArrayItems, getRandomDate, getRepeatClass};
