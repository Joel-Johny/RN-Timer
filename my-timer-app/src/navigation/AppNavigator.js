import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TimerScreen from "../screens/TimerScreen";
import HistoryScreen from "../screens/HistoryScreen";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo's vector icons

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Timers") {
              iconName = focused ? "timer" : "timer-outline";
            } else if (route.name === "History") {
              iconName = focused ? "list" : "list-outline";
            }

            // You can return any component here
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Timers" component={TimerScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
