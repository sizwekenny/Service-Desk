import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import RequestsScreen from "../screens/admin/RequestsScreen";
import UsersScreen from "../screens/admin/UsersScreen";
import MyTicketsScreen from "../screens/customer/MyTicketsScreen";
import NewTicketScreen from "../screens/customer/NewTicketScreen";
import MyJobsScreen from "../screens/technician/MyJobsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Role-based tabs
function AdminTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Requests" component={RequestsScreen} />
    </Tab.Navigator>
  );
}

function CustomerTabs({ currentUser }) {
  if (!currentUser) return null; // safety check

  return (
    <Tab.Navigator>
      <Tab.Screen name="New Ticket">
        {props => <NewTicketScreen {...props} currentUser={currentUser} />}
      </Tab.Screen>
      <Tab.Screen name="My Tickets">
        {props => <MyTicketsScreen {...props} currentUser={currentUser} />}
      </Tab.Screen>
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
  const { currentUser, showSignup } = useContext(AuthContext);

  // Show signup screen if triggered
  if (showSignup) {
    return <SignupScreen />;
  }

  // If not logged in, show login screen
  if (!currentUser) {
    return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  // Logged-in routes
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser.role === "Admin" && <Stack.Screen name="Admin" component={AdminTabs} />}
      {currentUser.role === "Customer" && (
        <Stack.Screen name="Customer">
          {props => <CustomerTabs {...props} currentUser={currentUser} />}
        </Stack.Screen>
      )}
      {currentUser.role === "Technician" && <Stack.Screen name="Technician" component={TechnicianTabs} />}
    </Stack.Navigator>
  );
}
