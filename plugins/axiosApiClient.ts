import axios from 'axios';
import type { AxiosInstance } from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const axiosApiClient: AxiosInstance = axios.create();
  axiosApiClient.defaults.baseURL = process.env.API_NOCTURNAILED as string;
  return {
    provide: {
      axiosApiClient: axiosApiClient,
    },
  };
});