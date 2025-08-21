import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '/context/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('admin123');

  const onSubmit = () => {
    try {
      login(email.trim(), password);
    } catch (e) {
      Alert.alert('Login failed', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Desk</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={onSubmit} />
      <Text style={styles.help}>
        Try default admin: admin@demo.com / admin123
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 },
  help: { marginTop: 12, textAlign: 'center', color: '#666' },
});
