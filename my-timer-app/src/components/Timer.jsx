import React, { useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "react-native-progress/Bar"; // Import Progress Bar
import { TimerContext } from "../context/TimerContext";

function Timer({ timer }) {
  const { startTimer, pauseTimer, resetTimer, timerCompleted, updateTimer } =
    useContext(TimerContext);

  // Effect to handle countdown
  useEffect(() => {
    let intervalTimer;
    if (timer.status === "Running") {
      if (timer.duration === timer.elapsed) {
        timerCompleted(timer.id, timer.duration);
        clearInterval(intervalTimer);
      } else {
        intervalTimer = setInterval(() => {
          updateTimer(timer.id, { elapsed: timer.elapsed + 1 });
        }, 1000);
      }
    } else {
      // Clear interval when timer is not running
      clearInterval(intervalTimer);
    }

    // Cleanup function
    return () => {
      clearInterval(intervalTimer);
    };
  }, [timer]);

  // Handle Start
  const handleStart = () => {
    startTimer(timer.id);
  };

  // Handle Pause
  const handlePause = () => {
    pauseTimer(timer.id);
  };

  // Handle Reset
  const handleReset = () => {
    resetTimer(timer.id);
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerName}>{timer.name}</Text>
      <Text>Task Duration: {timer.duration}</Text>
      <Text>Time Remaining: {timer.duration - timer.elapsed}</Text>
      <Text>Status: {timer.status}</Text>

      {/* Progress Bar */}
      <ProgressBar
        progress={1 - (timer.duration - timer.elapsed) / timer.duration}
        width={null}
        height={10}
        color={
          timer.status === "Running"
            ? "blue" // Running → Blue
            : timer.status === "Paused"
            ? "orange" // Paused → Orange
            : timer.status === "Completed"
            ? "green" // Completed → Green
            : "red" // Not yet started → Red
        }
        style={styles.progressBar}
      />

      {/* Timer Controls */}
      <View style={styles.controls}>
        {timer.status === "Not yet started" || timer.status === "Paused" ? (
          <TouchableOpacity onPress={handleStart}>
            <Ionicons name="play" size={30} color="green" />
          </TouchableOpacity>
        ) : null}

        {timer.status === "Running" && (
          <TouchableOpacity onPress={handlePause}>
            <Ionicons name="pause" size={30} color="orange" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleReset}>
          <Ionicons name="refresh" size={30} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  timerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    marginVertical: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
export default React.memo(Timer);
