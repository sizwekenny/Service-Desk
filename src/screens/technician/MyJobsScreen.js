import { useContext } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../../context/DataContext';

export default function MyJobsScreen() {
  const { tickets, completeTicket } = useContext(DataContext);
  const { currentUser, logout } = useContext(AuthContext);

  const myJobs = tickets.filter(t => t.assignedTechnicianId === currentUser.id && t.status !== 'Completed');

  const onComplete = (ticketId) => {
    completeTicket(ticketId);
    Alert.alert('Success', 'Ticket marked as completed');
  };

  const renderItem = ({ item }) => (
    <View style={styles.ticketRow}>
      <Text style={styles.title}>{item.description}</Text>
      <Text>Customer ID: {item.customerId}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Contact: {item.contact}</Text>
      <Text>Status: {item.status}</Text>
      <Button title="Mark Completed" onPress={() => onComplete(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.titleMain}>My Jobs</Text>
        <Button title="Logout" onPress={logout} />
      </View>

      <FlatList
        data={myJobs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No assigned jobs</Text>}
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
