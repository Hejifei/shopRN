import {createSelector} from 'reselect';
import lodash from 'lodash';

export const homeSelector = (state) => lodash.get(state, 'home') || {};

export const countSelector = createSelector(
  homeSelector,
  (home) => lodash.get(home, 'count') || 0,
);
