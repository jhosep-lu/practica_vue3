import axios from 'axios';

export const request = (config) => {
  const axionInstance = axios.create(config);
  axionInstance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (!config.headers.Authorization) {
        config.headers = {
          ...config.headers,
        };
      }
      return config;
    },
    function (error) {
      return Promise.reject(error.message);
    },
  );

  // Add a response interceptor
  axionInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data;
    },
    function (error) {
      // Do something with request error
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return error;
    },
  );
  return axionInstance;
};

export const conectionServerJson = () => {
  return request({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 1000 * 120, //dos minutos
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    },
  });
};
