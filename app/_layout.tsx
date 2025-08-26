import React from 'react';
import { AuthProvider } from '../src/context/AuthContext';
import { DataProvider } from '../src/context/DataContext';
import RootNavigator from '../src/navigation/RootNavigator';

export default function RootLayout() {
  return (
    <DataProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </DataProvider>
  );
}
