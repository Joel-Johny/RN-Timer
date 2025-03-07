// src/screens/TimerScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TimerScreen() {
  return (
    <View style={styles.container}>
      <Text>Timer Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
