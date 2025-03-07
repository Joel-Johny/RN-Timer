import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TimerContext } from "../context/TimerContext";
import Timer from "./Timer";

export default function Category({ category }) {
  const [expanded, setExpanded] = useState(false);
  const { timers } = useContext(TimerContext);
  const categoryTimers = timers.filter((timer) => timer.category === category);
  return (
    <View style={styles.categoryContainer}>
      {/* Category Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.categoryTitle}>{category}</Text>
        <Text style={styles.toggleIcon}>{expanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {/* Timers List (Shown if Expanded) */}
      {expanded && (
        <View style={styles.timersContainer}>
          {categoryTimers.length > 0 ? (
            categoryTimers.map((timer) => (
              <Timer key={timer.id} timer={timer} />
            ))
          ) : (
            <Text style={styles.noTimersText}>
              No timers under this category. Create one!
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "lightblue",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleIcon: {
    fontSize: 18,
  },
  timersContainer: {
    padding: 10,
    backgroundColor: "white",
  },
  noTimersText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    padding: 10,
  },
});
