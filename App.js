import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { DataProvider } from './src/context/DataContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar />
          <SafeAreaView style={{ flex: 1 }}>
            <RootNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </AuthProvider>
    </DataProvider>
  );
}
