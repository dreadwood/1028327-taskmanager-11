const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
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

export {formatTime, getRandomIntegerNumber, getRandomArrayItems, getRandomDate, getRepeatClass};
