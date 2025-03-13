import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timers, setTimers] = useState([]);
  const [categories, setCategories] = useState(["Workout", "Study", "Break"]); // Default categories

  // Load timers from AsyncStorage on app startup
  useEffect(() => {
    async function loadTimers() {
      try {
        const storedTimers = await AsyncStorage.getItem("timers");
        if (storedTimers) {
          setTimers(JSON.parse(storedTimers));
        }

        const storedCategories = await AsyncStorage.getItem("categories");
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    }
    loadTimers();
  }, []);

  // Save timers to AsyncStorage helper function
  const saveTimers = async (updatedTimers) => {
    try {
      await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
    } catch (error) {
      console.error("Error saving timers to AsyncStorage:", error);
    }
  };

  // Function to add a new timer
  const addTimer = async (newTimer) => {
    try {
      const updatedTimers = [...timers, newTimer];
      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error adding timer:", error);
    }
  };

  const updateTimer = async (id, updatedFields) => {
    try {
      const updatedTimers = timers.map((timer) =>
        timer.id === id ? { ...timer, ...updatedFields } : timer
      );

      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error updating timer:", error);
    }
  };

  // Start Timer: Change status to "Running"
  const startTimer = async (id) => {
    updateTimer(id, { status: "Running" });
  };

  // Pause Timer: Save elapsed time and change status to "Paused"
  const pauseTimer = async (id) => {
    updateTimer(id, { status: "Paused" });
  };

  // Reset Timer: Reset elapsed time to 0 and set status to "Not yet started"
  const resetTimer = async (id) => {
    updateTimer(id, {
      status: "Not yet started",
      elapsed: 0,
      completionTime: "Pending",
    });
  };

  const timerCompleted = async (id, timerDuration) => {
    updateTimer(id, {
      status: "Completed",
      completionTime: new Date().toLocaleString(),
      elapsed: timerDuration,
    });
  };

  const startAllCategoryTimers = async (category) => {
    try {
      const updatedTimers = timers.map((timer) =>
        timer.category === category &&
        (timer.status === "Not yet started" || timer.status === "Paused")
          ? { ...timer, status: "Running" }
          : timer
      );

      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error starting category timers:", error);
    }
  };

  const pauseAllCategoryTimers = async (category) => {
    try {
      const updatedTimers = timers.map((timer) => {
        if (timer.category === category && timer.status === "Running") {
          return { ...timer, status: "Paused" };
        }
        return timer;
      });

      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error pausing category timers:", error);
    }
  };

  const resetAllCategoryTimers = async (category) => {
    try {
      const updatedTimers = timers.map((timer) =>
        timer.category === category
          ? {
              ...timer,
              status: "Not yet started",
              elapsed: 0,
              completionTime: "Pending",
            }
          : timer
      );

      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error resetting category timers:", error);
    }
  };

  const deleteAllTimers = async () => {
    try {
      setTimers([]);
      await AsyncStorage.removeItem("timers");
    } catch (error) {
      console.error("Error deleting all timers:", error);
    }
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
        startAllCategoryTimers,
        resetAllCategoryTimers,
        deleteAllTimers,
        updateTimer,
        pauseAllCategoryTimers,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
