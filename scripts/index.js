import {
  spinDiceOnClick,
  makeItemsSortable,
  shuffleColors,
  listenToToggles
} from './partials/misc.js';

import { alarm } from './partials/alarm.js';
import { searchWithHelpers } from './partials/search.js'

document.addEventListener('DOMContentLoaded', () => {

  listenToToggles();
  spinDiceOnClick();
  shuffleColors();
  makeItemsSortable();
  searchWithHelpers();
  alarm()
})


