const getDeadlineClass = (dueDate) => {
  return dueDate instanceof Date && dueDate < Date.now()
    ? `card--deadline`
    : ``;
};

const getRepeatClass = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean)
    ? `card--repeat`
    : ``;
};

export {getDeadlineClass, getRepeatClass};
