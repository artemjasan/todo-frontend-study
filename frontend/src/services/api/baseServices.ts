import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:8080',
});

export const headers = {
  'Content-Type': 'application/json',
};
