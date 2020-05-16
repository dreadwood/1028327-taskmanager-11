import moment from 'moment';

// const castTimeFormat = (value) => {
//   return value < 10 ? `0${value}` : `${value}`;
// };

const formatTime = (date) => {
  // const hours = castTimeFormat(date.getHours() % 12);
  // const minutes = castTimeFormat(date.getMinutes());

  // return `${hours}:${minutes}`;
  return moment(date).format(`hh:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
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

export {formatTime, formatDate, getRandomIntegerNumber, getRandomArrayItems, getRandomDate};
