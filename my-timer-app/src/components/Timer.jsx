import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TimerContext } from "../context/TimerContext";

export default function Timer({ timer }) {
  const { startTimer, pauseTimer, resetTimer, timerCompleted } =
    useContext(TimerContext);
  const [timeRemaining, setTimeRemaining] = useState(
    timer.duration - timer.elapsed
  );
  const intervalRef = useRef(null);

  // Effect to update timeRemaining on re-renders
  useEffect(() => {
    setTimeRemaining(timer.duration - timer.elapsed);
  }, [timer]);

  // Effect to handle timer countdown
  useEffect(() => {
    if (timer.status === "Running") {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            timerCompleted(timer.id);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer.status]);

  // Handle Start
  const handleStart = () => {
    if (timer.status !== "Running") {
      startTimer(timer.id);
    }
  };

  // Handle Pause
  const handlePause = () => {
    pauseTimer(timer.id, timer.duration - timeRemaining);
  };

  // Handle Reset
  const handleReset = () => {
    resetTimer(timer.id);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerName}>{timer.name}</Text>
      <Text>Task Duration : {formatTime(timer.duration)}</Text>
      <Text>Time Remaining : {formatTime(timeRemaining)}</Text>
      <Text>Status: {timer.status}</Text>
      {/* <Text>COmpleted: {timer.completionTime}</Text> */}

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
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
