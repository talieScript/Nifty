import axios from 'axios';

export const API = axios.create({
    baseURL: process.env.VUE_APP_API_KEY,
    withCredentials: false,
  });

export const IMAGE_URL = process.env.VUE_APP_IMAGE_URL;
