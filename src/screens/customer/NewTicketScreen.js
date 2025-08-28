import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';

export default function NewTicketScreen() {
  const { addTicket } = useContext(DataContext);
  const { currentUser, logout } = useContext(AuthContext);

  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');

  // If user is not logged in, show a message
  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text>User not logged in.</Text>
      </View>
    );
  }

  const onSubmit = () => {
    if (!address || !contact || !description) {
      Alert.alert('Missing info', 'Please fill all fields');
      return;
    }
    addTicket({ customerId: currentUser.id, address, contact, description });
    Alert.alert('Success', 'Ticket created');
    setAddress('');
    setContact('');
    setDescription('');
  };

 
  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>New Ticket</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
      />
      <TextInput
        style={styles.input}
        placeholder="Issue Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title="Submit Ticket" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 },
});
