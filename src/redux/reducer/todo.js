import { createSlice } from '@reduxjs/toolkit';
import { createTodo, getAllTodo, updateTodo } from '../action/todo';

const initialState = {
  results: [],
  sorted: [],
  result: {},
  successMsg: '',
  errorMsg: '',
};

const todo = createSlice({
  name: 'todo-reducer',
  initialState,
  reducers: {
    newerSort: (state, action) => {
      state.sorted = action.payload;
    },
    olderSort: (state, action) => {
      state.sorted = action.payload;
    },
    ascSort: (state, action) => {
      state.sorted = action.payload;
    },
    descSort: (state, action) => {
      state.sorted = action.payload;
    },
    unFinished: (state, action) => {
      state.sorted = action.payload;
    },
    deletedItem: (state, action) => {
      if (state.sorted.length > 1) {
        state.sorted = state.results.filter((e) => e.id !== action.payload);
      } else {
        state.sorted = [];
      }
    },
    resetData: (state) => {
      state.sorted = [];
    },
  },
  extraReducers: (build) => {
    build.addCase(getAllTodo.pending, (state) => {
      state.successMsg = '';
      state.errorMsg = '';
    });
    build.addCase(getAllTodo.fulfilled, (state, action) => {
      state.results = action.payload.data;
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
    build.addCase(createTodo.pending, (state) => {
      state.successMsg = '';
      state.errorMsg = '';
    });
    build.addCase(createTodo.fulfilled, (state, action) => {
      state.result = action.payload;
      state.sorted.unshift(action.payload);
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
    build.addCase(updateTodo.pending, (state) => {
      state.successMsg = '';
      state.errorMsg = '';
    });
    build.addCase(updateTodo.fulfilled, (state, action) => {
      state.result = action.payload.data;
      state.successMsg = action.payload.message;
      state.errorMsg = action.payload.errorMsg;
    });
  },
});

export { getAllTodo, createTodo, updateTodo };
export const {
  newerSort,
  olderSort,
  ascSort,
  descSort,
  unFinished,
  deletedItem,
  resetData,
} = todo.actions;
export default todo.reducer;
