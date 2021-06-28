import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { instanceBE, instanceREFRESH } from './config/axios';

instanceBE.interceptors.response.use(response => response, 
  async (error) => {

    if(error.response.status === 401) {
      const originalRequest = error.config;
      originalRequest._retry = true;
      
      const data = {'refresh' : `${localStorage.getItem('refresh')}`}
      
      return instanceREFRESH.post('jwt/refresh/', data).then((response) => {
        localStorage.setItem('access', response.data.access);
        originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
        return instanceBE(originalRequest);
      });
    }

    return Promise.reject(error);

});

ReactDOM.render(
    <App />,
  document.getElementById('root')
);