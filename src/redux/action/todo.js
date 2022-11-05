import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';
import http from '../../helpers/http';

export const getAllTodo = createAsyncThunk('todo/getAllTodo', async (param) => {
  const result = {};
  try {
    const { data } = await http().get(
      '/todo-items?activity_group_id=' + param.id
    );
    return data;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});
export const getOneTodo = createAsyncThunk('todo/getOneTodo', async (param) => {
  const result = {};
  try {
    const { data } = await http().get('/todo-items/' + param.id);
    return data;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});
export const createTodo = createAsyncThunk('todo/createTodo', async (param) => {
  const result = {};
  try {
    const sendData = qs.stringify({
      activity_group_id: param.activityGroupId,
      title: param.title,
      priority: param.priority,
    });
    const { data } = await http().post('/todo-items', sendData);
    return data;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});
export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (param) => {
  const result = {};
  try {
    const { data } = await http().delete('/todo-items/' + param.id);
    return data;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});
export const updateTodo = createAsyncThunk('todo/updateTodo', async (param) => {
  const result = {};
  try {
    let sendData = qs.stringify(param);
    const { data } = await http().patch('/todo-items/' + param.id, sendData);
    return data;
  } catch (error) {
    result.errorMsg = error.response.data.message;
    return result;
  }
});
