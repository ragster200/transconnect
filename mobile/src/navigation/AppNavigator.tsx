import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Screens (we'll import these properly)
const JobsScreen = () => null;
const BackloadsScreen = () => null;
const EquipmentScreen = () => null;
const DirectoryScreen = () => null;
const AISearchScreen = () => null;

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-circle';

          switch (route.name) {
            case 'Jobs':
              iconName = focused ? 'briefcase' : 'briefcase-outline';
              break;
            case 'Backloads':
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
              break;
            case 'Equipment':
              iconName = focused ? 'truck' : 'truck-outline';
              break;
            case 'Directory':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'AI Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066cc',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#0066cc',
        },
        headerTintColor: 'white',
      })}
    >
      <Tab.Screen name="Jobs" component={JobsScreen} />
      <Tab.Screen name="Backloads" component={BackloadsScreen} />
      <Tab.Screen name="Equipment" component={EquipmentScreen} />
      <Tab.Screen name="Directory" component={DirectoryScreen} />
      <Tab.Screen name="AI Search" component={AISearchScreen} />
    </Tab.Navigator>
  );
}