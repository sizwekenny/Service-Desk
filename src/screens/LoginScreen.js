import React, { useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const { login, setShowSignup, setShowHome } = useContext(AuthContext);
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("admin123");

  const onSubmit = () => {
    try {
      login(email.trim(), password);
    } catch (e) {
      Alert.alert("Login failed", e.message);
    }
  };

  return (
    <View style={styles.container}>
     
      <TouchableOpacity style={styles.homeBtn} onPress={() => setShowHome(true)}>
        <Text style={styles.homeText}>🏠 Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Service Desk</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
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

     
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <TouchableOpacity onPress={() => setShowSignup(true)}>
          <Text style={styles.signupText}>Don’t have an account yet? Create one</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.help}>Try admin: admin@demo.com / admin123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  homeBtn: { position: "absolute", top: 40, left: 20 }, 
  homeText: { color: "#007BFF", fontSize: 16, fontWeight: "600" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  help: { marginTop: 12, textAlign: "center", color: "#666" },
  signupText: {
    color: "#007BFF", 
    fontSize: 14, 
    textAlign: "center",
  },
});
