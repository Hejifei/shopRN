import * as actionTypes from './index';

export function mineAdd(num) {
  return {
    type: actionTypes.MINE_ADD,
    num,
  };
}

export function mineCut(num) {
  return {
    type: actionTypes.MINE_CUT,
    num,
  };
}
