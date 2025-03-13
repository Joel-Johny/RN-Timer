import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timers, setTimers] = useState([]);
  const [categories, setCategories] = useState(["Workout", "Study", "Break"]);
  const [completedTimers, setCompletedTimers] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedTimerInfo, setCompletedTimerInfo] = useState(null);

  // Load data from AsyncStorage on app startup
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load timers
        const storedTimers = await AsyncStorage.getItem("timers");
        if (storedTimers) {
          setTimers(JSON.parse(storedTimers));
        }

        // Load categories
        const storedCategories = await AsyncStorage.getItem("categories");
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        }

        // Load completed timers history
        const storedHistory = await AsyncStorage.getItem("completedTimers");
        if (storedHistory) {
          setCompletedTimers(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  // Save timers to AsyncStorage
  const saveTimers = async (updatedTimers) => {
    try {
      await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
    } catch (error) {
      console.error("Error saving timers to AsyncStorage:", error);
    }
  };

  // Save completed timers to AsyncStorage
  const saveCompletedTimers = async (updatedHistory) => {
    try {
      await AsyncStorage.setItem(
        "completedTimers",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Error saving history to AsyncStorage:", error);
    }
  };

  // Add a new timer
  const addTimer = async (newTimer) => {
    try {
      const updatedTimers = [...timers, newTimer];
      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error adding timer:", error);
    }
  };

  // Update a timer with optional skipping of AsyncStorage persistence
  const updateTimer = async (id, updatedFields, skipPersistence = false) => {
    try {
      const updatedTimers = timers.map((timer) =>
        timer.id === id ? { ...timer, ...updatedFields } : timer
      );

      setTimers(updatedTimers);

      // Skip AsyncStorage update if requested (for performance optimization)
      if (!skipPersistence) {
        await saveTimers(updatedTimers);
      }
    } catch (error) {
      console.error("Error updating timer:", error);
    }
  };

  // Start Timer
  const startTimer = async (id) => {
    updateTimer(id, { status: "Running" });
  };

  // Pause Timer
  const pauseTimer = async (id) => {
    updateTimer(id, { status: "Paused" });
  };

  // Reset Timer
  const resetTimer = async (id) => {
    updateTimer(id, {
      status: "Not yet started",
      elapsed: 0,
    });
  };

  const timerCompleted = async (id) => {
    // Find the timer
    const timer = timers.find((t) => t.id === id);

    if (!timer || timer.status === "Completed") return;

    // Update timer status
    await updateTimer(id, {
      status: "Completed",
      elapsed: timer.duration,
    });

    // Add to completed timers history
    const completedTimer = {
      ...timer,
      status: "Completed", // Ensure status is set here too
      elapsed: timer.duration,
      completedAt: new Date().toISOString(),
    };

    const updatedHistory = [...completedTimers, completedTimer];
    setCompletedTimers(updatedHistory);
    await saveCompletedTimers(updatedHistory);

    // Show completion modal
    setCompletedTimerInfo(completedTimer);
    setShowCompletionModal(true);
  };

  // Start all timers in a category
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

  // Pause all timers in a category
  const pauseAllCategoryTimers = async (category) => {
    try {
      const updatedTimers = timers.map((timer) =>
        timer.category === category && timer.status === "Running"
          ? { ...timer, status: "Paused" }
          : timer
      );

      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error pausing category timers:", error);
    }
  };

  // Reset all timers in a category
  const resetAllCategoryTimers = async (category) => {
    try {
      const updatedTimers = timers.map((timer) =>
        timer.category === category
          ? { ...timer, status: "Not yet started", elapsed: 0 }
          : timer
      );

      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error resetting category timers:", error);
    }
  };

  // Delete a timer
  const deleteTimer = async (id) => {
    try {
      const updatedTimers = timers.filter((timer) => timer.id !== id);
      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error deleting timer:", error);
    }
  };

  // Add a new category
  const addCategory = async (newCategory) => {
    try {
      if (!categories.includes(newCategory)) {
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        await AsyncStorage.setItem(
          "categories",
          JSON.stringify(updatedCategories)
        );
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Delete a category and its timers
  const deleteCategory = async (categoryToDelete) => {
    try {
      // Remove the category
      const updatedCategories = categories.filter(
        (c) => c !== categoryToDelete
      );
      setCategories(updatedCategories);
      await AsyncStorage.setItem(
        "categories",
        JSON.stringify(updatedCategories)
      );

      // Remove all timers in this category
      const updatedTimers = timers.filter(
        (t) => t.category !== categoryToDelete
      );
      setTimers(updatedTimers);
      await saveTimers(updatedTimers);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Hide completion modal
  const hideCompletionModal = () => {
    setShowCompletionModal(false);
    setCompletedTimerInfo(null);
  };

  // Clear history
  const clearHistory = async () => {
    try {
      setCompletedTimers([]);
      await AsyncStorage.removeItem("completedTimers");
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimer,
        updateTimer,
        deleteTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        timerCompleted,
        categories,
        addCategory,
        deleteCategory,
        startAllCategoryTimers,
        pauseAllCategoryTimers,
        resetAllCategoryTimers,
        completedTimers,
        clearHistory,
        showCompletionModal,
        completedTimerInfo,
        hideCompletionModal,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
