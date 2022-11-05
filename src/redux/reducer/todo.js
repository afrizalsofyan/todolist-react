import { createSlice } from '@reduxjs/toolkit';
import { createTodo, getAllTodo, updateTodo } from '../action/todo';

const initialState = {
  results: [],
  result: {},
  successMsg: '',
  errorMsg: '',
};

const todo = createSlice({
  name: 'todo-reducer',
  initialState,
  reducers: {},
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
      state.result = action.payload.data;
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
export default todo.reducer;
