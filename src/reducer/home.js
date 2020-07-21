import update from 'immutability-helper';
import * as actionTypes from '../action/index';

// 初始state,我先随手定义了几个，后面可能会用到
const initState = {
  count: 0,
};

export default function count(state = initState, action) {
  switch (action.type) {
    case actionTypes.HOME_ADD:
      const {data} = action
      return update(state, {
        count: {$set: data},
      })
    case actionTypes.HOME_CUT:
      return update(state, {
        count: {$set: 0},
      })
    default:
      return state;
  }
}
