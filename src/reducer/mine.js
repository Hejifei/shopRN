import * as actionTypes from '../action/index';

// 初始state,我先随手定义了几个，后面可能会用到
const initState = {
  initCount: 0,
  name: '',
  age: '',
  job: '',
};

export default function count(state = initState, action) {
  switch (action.type) {
    case actionTypes.HOME_ADD:
      return {
        ...state,
        ...action.initCount,
      };
    case actionTypes.HOME_CUT:
      return {
        ...state,
        ...action.initCount,
      };
    default:
      return state;
  }
}
