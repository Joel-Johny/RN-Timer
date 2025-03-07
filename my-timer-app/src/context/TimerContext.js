import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timers, setTimers] = useState([]);
  const [categories, setCategories] = useState(["Workout", "Study", "Break"]); // Default categories

  // Load timers from AsyncStorage on app startup
  useEffect(() => {
    async function loadTimers() {
      const storedTimers = await AsyncStorage.getItem("timers");
      if (storedTimers) {
        setTimers(JSON.parse(storedTimers));
      }

      const storedCategories = await AsyncStorage.getItem("categories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    }
    loadTimers();
  }, []);

  // Function to add a new timer
  const addTimer = async (newTimer) => {
    const updatedTimers = [...timers, newTimer];
    setTimers(updatedTimers);
    await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
  };

  return (
    <TimerContext.Provider value={{ timers, addTimer, categories }}>
      {children}
    </TimerContext.Provider>
  );
}
