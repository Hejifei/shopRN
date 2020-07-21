import {combineReducers} from 'redux';
import home from './home';
import mine from './mine';

const reducer = combineReducers({
  home,
  mine,
});

export default reducer;
