import {Platform} from 'react-native';
import store from '../store';

export const checkIsIOS = () => Platform.OS === 'ios' || false;

/**
 * 触发action
 * @param action
 */
export function dispatchAction(action) {
  store.dispatch(action);
}
