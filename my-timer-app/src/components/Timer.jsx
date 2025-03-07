import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Timer({ timer }) {
  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerName}>{timer.name}</Text>
      <Text>Duration: {timer.duration} sec</Text>
      <Text>Status: {timer.status}</Text>
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
});
