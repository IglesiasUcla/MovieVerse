import axios from 'axios';

// Configuración base para todas las APIs
const createApiInstance = (baseURL, params = {}) => {
  return axios.create({
    baseURL,
    params,
  });
};

export default createApiInstance;
