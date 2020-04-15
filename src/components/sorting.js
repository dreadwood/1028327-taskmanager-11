const createSortingMarkup = (sorting) => {
  const {type, name} = sorting;
  return (
    `<a href="#" class="board__filter" data-sort-type="${type}">${name}</a>`
  );
};

export const createSortingTemplate = () => {
  const sortTypes = [
    {
      type: `default`,
      name: `SORT BY DEFAULT`
    },
    {
      type: `date-up`,
      name: `SORT BY DATE up`
    },
    {
      type: `date-down`,
      name: `SORT BY DATE down`
    }];

  const sortingMarkup = sortTypes.map((it) => createSortingMarkup(it)).join(`\n`);

  return (
    `<div class="board__filter-list">
      ${sortingMarkup}
    </div>`
  );
};
