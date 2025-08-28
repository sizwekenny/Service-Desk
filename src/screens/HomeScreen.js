// screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { currentUser, logout, setShowHome,setShowSignup  } = useContext(AuthContext);

  if (!currentUser) {
    // Not logged in view
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Tech Support App</Text>
        <Text style={styles.subtitle}>
          Manage your tickets and jobs with ease
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowHome(false)} // go to login
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={[styles.button, styles.secondaryButton]}
  onPress={() => setShowSignup(true)} // <-- change here
>
  <Text style={styles.buttonText}>Sign Up</Text>
</TouchableOpacity>
      </View>
    );
  }

  // Logged in view
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {currentUser.name} 👋</Text>
      <Text style={styles.subtitle}>Welcome back to your dashboard</Text>

      {currentUser.role.toLowerCase() === 'technician' ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowHome(false)} 
        >
          <Text style={styles.buttonText}>Go to My Jobs</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowHome(false)} 
        >
          <Text style={styles.buttonText}>Go to My Tickets</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9fafb' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8, textAlign: 'center', color: '#111827' },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 30, textAlign: 'center' },
  button: { backgroundColor: '#2563eb', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8, marginVertical: 8, width: '80%', alignItems: 'center', elevation: 2 },
  secondaryButton: { backgroundColor: '#10b981' },
  logoutButton: { backgroundColor: '#ef4444', marginTop: 30 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
