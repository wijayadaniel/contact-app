import axios from 'axios';

const BASE_URL = 'https://simple-contact-crud.herokuapp.com';

export const request = axios.create({baseURL: BASE_URL});

request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
