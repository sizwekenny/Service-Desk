import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '/context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import UsersScreen from '../screens/admin/UsersScreen';
import RequestsScreen from '../screens/admin/RequestsScreen';
import NewTicketScreen from '../screens/customer/NewTicketScreen';
import MyTicketsScreen from '../screens/customer/MyTicketsScreen';
import MyJobsScreen from '../screens/technician/MyJobsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AdminTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Requests" component={RequestsScreen} />
    </Tab.Navigator>
  );
}

function CustomerTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="New Ticket" component={NewTicketScreen} />
      <Tab.Screen name="My Tickets" component={MyTicketsScreen} />
    </Tab.Navigator>
  );
}

function TechnicianTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Jobs" component={MyJobsScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      {currentUser.role === 'Admin' && (
        <Stack.Screen name="Admin" component={AdminTabs} options={{ headerShown: false }} />
      )}
      {currentUser.role === 'Customer' && (
        <Stack.Screen name="Customer" component={CustomerTabs} options={{ headerShown: false }} />
      )}
      {currentUser.role === 'Technician' && (
        <Stack.Screen name="Technician" component={TechnicianTabs} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
