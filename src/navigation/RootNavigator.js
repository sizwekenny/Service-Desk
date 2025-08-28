// navigation/RootNavigator.js
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/AuthContext";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import RequestsScreen from "../screens/admin/RequestsScreen";
import UsersScreen from "../screens/admin/UsersScreen";
import MyTicketsScreen from "../screens/customer/MyTicketsScreen";
import NewTicketScreen from "../screens/customer/NewTicketScreen";
import MyJobsScreen from "../screens/technician/MyJobsScreen";
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Role-based tab navigators
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Users') {
            iconName = 'people-outline';
          } else if (route.name === 'Requests') {
            iconName = 'list-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Requests" component={RequestsScreen} />
    </Tab.Navigator>
  );
}

function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'New Ticket') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'My Tickets') {
            iconName = 'document-text-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="New Ticket" component={NewTicketScreen} />
      <Tab.Screen name="My Tickets" component={MyTicketsScreen} />
    </Tab.Navigator>
  );
}

function TechnicianTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="briefcase-outline" size={size} color={color} />
        ),
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="My Jobs" component={MyJobsScreen} />
    </Tab.Navigator>
  );
}

// Main navigator
export default function RootNavigator() {
  const { currentUser, showSignup, showHome } = useContext(AuthContext);

  // Show Signup screen if triggered
  if (showSignup) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    );
  }

  if (showHome) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
  }

  // Show Login screen if not logged in
  if (!currentUser) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  // Logged-in routes based on role
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser.role.toLowerCase() === "admin" && (
        <Stack.Screen name="Admin" component={AdminTabs} />
      )}
      {currentUser.role.toLowerCase() === "customer" && (
        <Stack.Screen name="Customer" component={CustomerTabs} />
      )}
      {currentUser.role.toLowerCase() === "technician" && (
        <Stack.Screen name="Technician" component={TechnicianTabs} />
      )}
    </Stack.Navigator>
  );
}
