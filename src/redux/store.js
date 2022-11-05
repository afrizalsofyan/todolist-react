import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});

export default store;
