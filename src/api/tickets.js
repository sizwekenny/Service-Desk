import { api } from './client';

export const getTickets = () => api.get('/tickets').then(r => r.data);
export const createTicket = (payload) => api.post('/tickets', payload).then(r => r.data);
export const assignTicket = (ticketId, technician_id) =>
  api.post(`/tickets/${ticketId}/assign`, { technician_id }).then(r => r.data);
export const completeTicket = (ticketId) =>
  api.post(`/tickets/${ticketId}/complete`).then(r => r.data);
