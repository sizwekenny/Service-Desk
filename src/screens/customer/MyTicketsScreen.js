import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../context/AuthContext';

export default function MyTicketsScreen() {
  const { tickets } = useContext(DataContext);
  const { currentUser, logout } = useContext(AuthContext);

  const myTickets = tickets.filter(t => t.customerId === currentUser.id);

  const renderItem = ({ item }) => (
    <View style={styles.ticketRow}>
      <Text style={styles.title}>{item.description}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Contact: {item.contact}</Text>
      <Text>Status: {item.status}</Text>
      {item.assignedTechnicianId && <Text>Technician ID: {item.assignedTechnicianId}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.titleMain}>My Tickets</Text>
        <Button title="Logout" onPress={logout} />
      </View>

      <FlatList
        data={myTickets}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No tickets yet</Text>}
      />
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
