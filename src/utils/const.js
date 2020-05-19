const COLOR = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const COLORS = Object.values(COLOR);

const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

// export const MONTH_NAMES = [
//   `January`,
//   `February`,
//   `March`,
//   `April`,
//   `May`,
//   `June`,
//   `July`,
//   `August`,
//   `September`,
//   `October`,
//   `November`,
//   `December`,
// ];

const FilterType = {
  ALL: `all`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATING: `repeating`,
  TODAY: `today`,
};

export {COLOR, COLORS, DAYS, FilterType};
