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
  const updateTimer = async (id, updatedFields) => {
    const updatedTimers = timers.map((timer) =>
      timer.id === id ? { ...timer, ...updatedFields } : timer
    );

    setTimers(updatedTimers);
    await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
  };

  // Start Timer: Change status to "Running"
  const startTimer = async (id) => {
    updateTimer(id, { status: "Running" });
  };

  // Pause Timer: Save elapsed time and change status to "Paused"
  const pauseTimer = async (id, elapsedTime) => {
    updateTimer(id, { status: "Paused", elapsed: elapsedTime });
  };

  // Reset Timer: Reset elapsed time to 0 and set status to "Not yet started"
  const resetTimer = async (id) => {
    updateTimer(id, {
      status: "Not yet started",
      elapsed: 0,
      completionTime: "Pending",
    });
  };
  const timerCompleted = async (id) => {
    updateTimer(id, {
      status: "Completed",
      completionTime: new Date().toLocaleString(),
    });
  };
  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimer,
        categories,
        startTimer,
        pauseTimer,
        timerCompleted,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
