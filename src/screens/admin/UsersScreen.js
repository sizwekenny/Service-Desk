import React, { useContext, useMemo, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';

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
        <Text style={styles.title}>Admin Dashboard</Text>
        <Button title="Logout" onPress={logout} />
      </View>

 
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: '#4e73df' }]}>
          <Text style={styles.statNumber}>{counts.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#1cc88a' }]}>
          <Text style={styles.statNumber}>{counts.admins}</Text>
          <Text style={styles.statLabel}>Admins</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#36b9cc' }]}>
          <Text style={styles.statNumber}>{counts.customers}</Text>
          <Text style={styles.statLabel}>Customers</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#f6c23e' }]}>
          <Text style={styles.statNumber}>{counts.technicians}</Text>
          <Text style={styles.statLabel}>Technicians</Text>
        </View>
      </View>

      
      <Text style={styles.subTitle}>Add User</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

     
      <View style={styles.roleRow}>
        {ROLES.map(r => (
          <TouchableOpacity
            key={r}
            style={[styles.roleChip, role === r && styles.roleChipActive]}
            onPress={() => setRole(r)}
          >
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
            <Text style={{ fontWeight: '600', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: '#555' }}>{item.email}</Text>
            <Text style={styles.badge}>{item.role}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fc' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },

  // Stats
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 14, color: '#fff', marginTop: 4 },

  // Form
  subTitle: { fontSize: 18, fontWeight: '600', marginTop: 8, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 8, backgroundColor: '#fff' },

  // Role selector
  roleRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  roleChip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#aaa', borderRadius: 16, marginRight: 8, marginBottom: 6 },
  roleChipActive: { backgroundColor: '#222' },
  roleText: { color: '#222' },
  roleTextActive: { color: '#fff' },

  // User list
  userRow: { paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  badge: { marginTop: 4, fontSize: 12, backgroundColor: '#eee', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
});
