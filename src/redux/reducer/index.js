import { combineReducers } from '@reduxjs/toolkit';
import activity from './activity';
import todo from './todo';

const reducer = combineReducers({
  activity,
  todo,
});
export default reducer;
