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

export {formatTime, createElement, render, RenderPosition};
