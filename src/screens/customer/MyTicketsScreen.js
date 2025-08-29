
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { DataContext } from '../../context/DataContext';

import React, { useEffect, useState, useContext } from 'react';
import { getTickets } from '../../api/tickets';
import { AuthContext } from '../../context/AuthContext';

export default function MyTicketsScreen() {
  const { currentUser, logout } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);

 
  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text>User not logged in.</Text>
      </View>
    );
  }
 useEffect(() => {
    let mounted = true;
    getTickets().then(data => { if (mounted) setTickets(data); });
    return () => { mounted = false; };
  }, []);
const myTickets = tickets.filter(t => t.customer_id === currentUser?.id);

  const renderItem = ({ item }) => (
    <View style={styles.ticketRow}>
      <Text style={styles.title}>{item.description}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Contact: {item.contact}</Text>
      <Text>Status: {item.status}</Text>
      {item.assignedTechnicianId && <Text>Technician ID: {item.assignedTechnicianId}</Text>}
    </View>
  );

  
  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.titleMain}>My Tickets</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>

      {myTickets.length === 0 ? (
        <Text>No tickets yet</Text>
      ) : (
        <FlatList
          data={myTickets}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  titleMain: { fontSize: 24, fontWeight: 'bold' },
  ticketRow: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 },
  title: { fontWeight: '600', fontSize: 16, marginBottom: 4 },
});
