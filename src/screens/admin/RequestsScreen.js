import { Picker } from '@react-native-picker/picker'; 
import React, { useContext, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

export default function RequestsScreen() {
  const { tickets, users, assignTechnician } = useContext(DataContext);
  const { logout } = useContext(AuthContext);
  const [selectedTechs, setSelectedTechs] = useState({});

  const technicians = users.filter(u => u.role === 'Technician');

  const onAssign = (ticketId) => {
    const techId = selectedTechs[ticketId];
    if (!techId) {
      Alert.alert('Select Technician', 'Please select a technician to assign.');
      return;
    }
    assignTechnician(ticketId, techId);
    Alert.alert('Assigned', 'Technician assigned successfully');
  };

  const renderItem = ({ item }) => (
    <View style={styles.ticketRow}>
      <Text style={styles.title}>{item.description}</Text>
      <Text>Customer ID: {item.customerId}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Contact: {item.contact}</Text>
      <Text>Status: {item.status}</Text>

      {item.status === 'Pending' && (
        <View style={styles.assignRow}>
          <Picker
            selectedValue={selectedTechs[item.id] || ''}
            style={{ height: 50, flex: 1 }}
            onValueChange={(val) => setSelectedTechs(prev => ({ ...prev, [item.id]: val }))}
          >
            <Picker.Item label="Select Technician" value="" />
            {technicians.map(t => (
              <Picker.Item key={t.id} label={t.name} value={t.id} />
            ))}
          </Picker>
          <Button title="Assign" onPress={() => onAssign(item.id)} />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.titleMain}>Requests</Text>
        <Button title="Logout" onPress={logout} />
      </View>
      <FlatList
        data={tickets}
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
  assignRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
});
