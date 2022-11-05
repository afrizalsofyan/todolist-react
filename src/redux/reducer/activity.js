import { createSlice } from '@reduxjs/toolkit';
import {
  createActivity,
  deleteActivity,
  getAllActivity,
  getOneActivity,
  updateActivity,
} from '../action/activity';

const initialState = {
  results: [],
  result: {},
  successMsg: '',
  errorMsg: '',
};

const activity = createSlice({
  name: 'activity-reducer',
  initialState,
  reducers: {
    resetGetMsg: (state) => {
      state.successMsg = '';
      state.errorMsg = '';
    },
  },
  extraReducers: (build) => {
    build.addCase(getAllActivity.pending, (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(getAllActivity.fulfilled, (state, action) => {
      state.errorMsg = action.payload.errorMsg;
      state.results = action.payload.data;
      state.successMsg = action.payload.message;
    });
    build.addCase(getOneActivity.pending, (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(getOneActivity.fulfilled, (state, action) => {
      state.errorMsg = action.payload.errorMsg;
      state.result = action.payload;
      state.successMsg = action.payload.message;
    });
    build.addCase(createActivity.pending, (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(createActivity.fulfilled, (state, action) => {
      state.errorMsg = action.payload.errorMsg;
      state.result = action.payload.data;
      state.successMsg = action.payload.message;
    });
    build.addCase(deleteActivity.pending, (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(deleteActivity.fulfilled, (state, action) => {
      state.errorMsg = action.payload.errorMsg;
      state.result = action.payload.data;
      state.successMsg = action.payload.message;
    });
    build.addCase(updateActivity.pending, (state) => {
      state.errorMsg = null;
      state.successMsg = null;
    });
    build.addCase(updateActivity.fulfilled, (state, action) => {
      state.errorMsg = action.payload.errorMsg;
      state.result.title = action.payload?.title;
      state.successMsg = action.payload.message;
    });
  },
});

export {
  getAllActivity,
  getOneActivity,
  createActivity,
  deleteActivity,
  updateActivity,
};
export const { resetGetMsg } = activity.actions;
export default activity.reducer;
