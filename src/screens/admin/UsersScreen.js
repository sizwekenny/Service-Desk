import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../context/AuthContext';

const ROLES = ['Admin', 'Customer', 'Technician'];

export default function UsersScreen() {
  const { users, addUser } = useContext(DataContext);
  const { logout } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');

  const counts = useMemo(() => ({
    total: users.length,
    admins: users.filter(u => u.role === 'Admin').length,
    customers: users.filter(u => u.role === 'Customer').length,
    technicians: users.filter(u => u.role === 'Technician').length,
  }), [users]);

  const onAdd = () => {
    if (!name || !email || !password) {
      Alert.alert('Missing info', 'Please fill all fields');
      return;
    }
    try {
      addUser({ name, email, password, role });
      setName(''); setEmail(''); setPassword(''); setRole('Customer');
      Alert.alert('Success', 'User added');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Users</Text>
        <Button title="Logout" onPress={logout} />
      </View>

      <View style={styles.stats}>
        <Text>Total: {counts.total}</Text>
        <Text>Admins: {counts.admins}</Text>
        <Text>Customers: {counts.customers}</Text>
        <Text>Technicians: {counts.technicians}</Text>
      </View>

      <Text style={styles.subTitle}>Add User</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <View style={styles.roleRow}>
        {ROLES.map(r => (
          <TouchableOpacity key={r} style={[styles.roleChip, role === r && styles.roleChipActive]} onPress={() => setRole(r)}>
            <Text style={role === r ? styles.roleTextActive : styles.roleText}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Add User" onPress={onAdd} />

      <Text style={[styles.subTitle, { marginTop: 16 }]}>All Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={{ fontWeight: '600' }}>{item.name}</Text>
            <Text>{item.email}</Text>
            <Text style={styles.badge}>{item.role}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },
  stats: { flexDirection: 'row', gap: 16, marginBottom: 16, justifyContent: 'space-between' },
  subTitle: { fontSize: 18, fontWeight: '600', marginTop: 8, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 8 },
  roleRow: { flexDirection: 'row', gap: 8, marginBottom: 8, flexWrap: 'wrap' },
  roleChip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#aaa', borderRadius: 16, marginRight: 8, marginBottom: 6 },
  roleChipActive: { backgroundColor: '#222' },
  roleText: { color: '#222' },
  roleTextActive: { color: '#fff' },
  userRow: { paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
  badge: { marginTop: 4, fontSize: 12, backgroundColor: '#eee', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
});
