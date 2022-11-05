import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';
import http from '../../helpers/http';

export const getAllActivity = createAsyncThunk(
  'activity/getAllActivity',
  async (param) => {
    const result = {};
    try {
      const { data } = await http().get(
        '/activity-groups?email=' + param.email
      );
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  }
);
export const getOneActivity = createAsyncThunk(
  'activity/getOneActivity',
  async (param) => {
    const result = {};
    try {
      const { data } = await http().get('/activity-groups/' + param.id);
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  }
);
export const createActivity = createAsyncThunk(
  'activity/createActivity',
  async (param) => {
    const result = {};
    try {
      const sendData = qs.stringify({ email: param.email, title: param.title });
      const { data } = await http().post('/activity-groups', sendData);
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  }
);
export const deleteActivity = createAsyncThunk(
  'activity/deleteActivity',
  async (param) => {
    const result = {};
    try {
      const { data } = await http().delete('/activity-groups/' + param.id);
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  }
);
export const updateActivity = createAsyncThunk(
  'activity/updateActivity',
  async (param) => {
    const result = {};
    try {
      const sendData = qs.stringify({ title: param.title });
      const { data } = await http().patch(
        '/activity-groups/' + param.id,
        sendData
      );
      console.log(data);
      return data;
    } catch (error) {
      result.errorMsg = error.response.data.message;
      return result;
    }
  }
);
