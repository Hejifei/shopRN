import * as actionTypes from './index';
import {dispatchAction} from '../util';

export function homeCountAdd(num) {
  const action = {
    type: actionTypes.HOME_ADD,
    data: num,
  };

  dispatchAction(action);
}

export function homeCountCut() {
  const action = {
    type: actionTypes.HOME_CUT,
  };

  dispatchAction(action);
}
