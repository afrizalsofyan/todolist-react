import axios from 'axios';

const http = () => {
  return axios.create({
    baseURL: 'https://todo.api.devcode.gethired.id',
  });
};

export default http;
