import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // or SecureStore

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // replace with your LAN IP for device testing
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); // or SecureStore.getItemAsync('token')
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
