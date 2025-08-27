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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Role-based tab navigators
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

// Main navigator
export default function RootNavigator() {
  const { currentUser, showSignup, showHome } = useContext(AuthContext);

  // Show Home screen if triggered
  if (showHome) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
  }

  // Show Signup screen if triggered
  if (showSignup) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
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
