import axios from 'axios'

const useAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/login/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

useAxios.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;

      if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
          const refresh_token = localStorage.getItem('refresh_token');

          return useAxios
              .post('/token/refresh/', {refresh: refresh_token})
              .then((response) => {

                  localStorage.setItem('access_token', response.data.access);
                  localStorage.setItem('refresh_token', response.data.refresh);

                  useAxios.defaults.headers['Authorization'] = "JWT " + response.data.access;
                  originalRequest.headers['Authorization'] = "JWT " + response.data.access;

                  return useAxios(originalRequest);
              })
              .catch(err => {
                  console.log(err)
              });
      }
      // specific error handling done elsewhere
      return Promise.reject({...error});
  }
);

export default useAxios