import { createContext, useMemo, useState } from 'react';

export const DataContext = createContext();

const makeId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export function DataProvider({ children }) {
  const [users, setUsers] = useState([
    { id: 'u-admin', name: 'Admin', email: 'admin@demo.com', password: 'admin123', role: 'Admin' },
  ]);
  const [tickets, setTickets] = useState([]);

  
  const addUser = (user) => {
    setUsers(prev => {
      if (prev.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
        throw new Error('Email already exists');
      }
      return [...prev, { ...user, id: makeId() }];
    });
  };

  
  const addTicket = ({ customerId, address, contact, description }) => {
    const newTicket = {
      id: makeId(),
      customerId,
      address,
      contact,
      description,
      status: 'Pending',
      assignedTechnicianId: null,
      createdAt: Date.now(),
    };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };
  const assignTechnician = (ticketId, technicianId) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, assignedTechnicianId: technicianId, status: 'Assigned' };
      }
      return t;
    }));
  };

  const completeTicket = (ticketId) => {
    setTickets(prev => prev.map(t => (t.id === ticketId ? { ...t, status: 'Completed' } : t)));
  };

 
  const getTechnicians = () => users.filter(u => u.role === 'Technician');
  const getCustomers = () => users.filter(u => u.role === 'Customer');

  const value = useMemo(() => ({
    users,
    tickets,
    addUser,
    addTicket,
    assignTechnician,
    completeTicket,
    getTechnicians,
    getCustomers,
  }), [users, tickets]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
