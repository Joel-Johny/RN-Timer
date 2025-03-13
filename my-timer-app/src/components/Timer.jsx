import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { TimerContext } from "../context/TimerContext";

function Timer({ timer }) {
  // Get functions from context
  const {
    startTimer,
    pauseTimer,
    resetTimer,
    updateTimer,
    timerCompleted,
    deleteTimer,
  } = useContext(TimerContext);

  // Local state for elapsed time to avoid context update issues
  const [localElapsed, setLocalElapsed] = useState(timer.elapsed);

  // Ref to store interval ID
  const intervalRef = useRef(null);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Sync local state with context
  useEffect(() => {
    setLocalElapsed(timer.elapsed);
  }, [timer.elapsed]);

  // Effect to handle timer logic
  // In Timer.jsx, update the useEffect that handles the interval:

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only start a new interval if timer is running AND not at full duration
    if (timer.status === "Running" && localElapsed < timer.duration) {
      intervalRef.current = setInterval(() => {
        setLocalElapsed((prev) => {
          const next = prev + 1;

          // Check if timer is complete
          if (next >= timer.duration) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;

            // Call completed function from context
            timerCompleted(timer.id);
            return timer.duration;
          }

          // Update context every second
          updateTimer(timer.id, { elapsed: next }, true);
          return next;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    timer.status,
    timer.id,
    timer.duration,
    localElapsed,
    timerCompleted,
    updateTimer,
  ]);
  // Calculate progress and remaining time
  const progress = localElapsed / timer.duration;
  const remainingTime = timer.duration - localElapsed;

  // Handler functions
  const handleStart = () => startTimer(timer.id);
  const handlePause = () => pauseTimer(timer.id);
  const handleReset = () => resetTimer(timer.id);
  const handleDelete = () => deleteTimer(timer.id);

  // Get progress bar color based on timer status
  const getProgressColor = () => {
    switch (timer.status) {
      case "Running":
        return "#007AFF";
      case "Paused":
        return "#FF9500";
      case "Completed":
        return "#34C759";
      default:
        return "#8E8E93";
    }
  };

  return (
    <View style={styles.container}>
      {/* Timer header with name and delete button */}
      <View style={styles.header}>
        <Text style={styles.name}>{timer.name}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="close-circle" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      {/* Timer info and progress */}
      <View style={styles.timerInfo}>
        <View style={styles.timeInfo}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Remaining</Text>
            <Text style={styles.timeValue}>{formatTime(remainingTime)}</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Total</Text>
            <Text style={styles.timeValue}>{formatTime(timer.duration)}</Text>
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getProgressColor() },
              ]}
            >
              <Text style={styles.statusText}>{timer.status}</Text>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <Progress.Bar
          progress={progress}
          width={null}
          height={8}
          borderRadius={4}
          color={getProgressColor()}
          unfilledColor="#E0E0E0"
          borderWidth={0}
          style={styles.progressBar}
        />
      </View>

      {/* Timer controls */}
      <View style={styles.controls}>
        {(timer.status === "Not yet started" || timer.status === "Paused") && (
          <TouchableOpacity
            style={[styles.controlButton, styles.startButton]}
            onPress={handleStart}
          >
            <Ionicons name="play" size={20} color="#FFF" />
            <Text style={styles.controlText}>Start</Text>
          </TouchableOpacity>
        )}

        {timer.status === "Running" && (
          <TouchableOpacity
            style={[styles.controlButton, styles.pauseButton]}
            onPress={handlePause}
          >
            <Ionicons name="pause" size={20} color="#FFF" />
            <Text style={styles.controlText}>Pause</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={handleReset}
        >
          <Ionicons name="refresh" size={20} color="#FFF" />
          <Text style={styles.controlText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 4,
  },
  timerInfo: {
    marginBottom: 12,
  },
  timeInfo: {
    flexDirection: "row",
    marginBottom: 8,
  },
  timeContainer: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statusContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  statusLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginBottom: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  progressBar: {
    marginTop: 8,
  },
  controls: {
    flexDirection: "row",
  },
  controlButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  startButton: {
    backgroundColor: "#34C759",
  },
  pauseButton: {
    backgroundColor: "#FF9500",
  },
  resetButton: {
    backgroundColor: "#007AFF",
  },
  controlText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 4,
  },
});

// Use React.memo to prevent unnecessary re-renders
export default React.memo(Timer);
