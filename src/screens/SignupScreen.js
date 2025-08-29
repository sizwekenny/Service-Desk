import React, { useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function SignupScreen() {
  const { signupCustomer, setShowSignup,setShowHome } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
  if (!name.trim() || !email.trim() || !password) {
    Alert.alert("All fields are required", "Please fill in all fields.");
    return;
  }
  try {
    signupCustomer(name.trim(), email.trim(), password);
    setShowSignup(false);
    setShowHome(true);
  } catch (e) {
    Alert.alert("Signup failed", e.message);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Sign Up</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={onSubmit} />
      <Button title="Back to Home" onPress={() => setShowSignup(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 12 },
});
