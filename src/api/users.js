import { api } from './client';
export const getUsers = () => api.get('/users').then(r => r.data);
export const addUser = (payload) => api.post('/users', payload).then(r => r.data);
