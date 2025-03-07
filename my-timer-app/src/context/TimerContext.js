import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timers, setTimers] = useState([]);

  // Load timers from AsyncStorage on app startup
  useEffect(() => {
    async function loadTimers() {
      const storedTimers = await AsyncStorage.getItem("timers");
      if (storedTimers) {
        setTimers(JSON.parse(storedTimers));
      }
    }
    loadTimers();
  }, []);

  // Function to add a new timer
  const addTimer = async (newTimer) => {
    const updatedTimers = [...timers, newTimer];
    setTimers(updatedTimers);
    await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers)); // Save to AsyncStorage
  };

  return (
    <TimerContext.Provider value={{ timers, addTimer }}>
      {children}
    </TimerContext.Provider>
  );
}
