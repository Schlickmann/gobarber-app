import axios from 'axios';

const api = axios.create({
  // adroid emulator 10.0.2.2
  baseURL: 'http://localhost:3333',
});

export default api;
