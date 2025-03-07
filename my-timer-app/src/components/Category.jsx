import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TimerContext } from "../context/TimerContext";
import Timer from "./Timer";
import { Ionicons } from "@expo/vector-icons";

export default function Category({ category }) {
  const [expanded, setExpanded] = useState(false);
  const {
    timers,
    startAllCategoryTimers,
    pauseAllCategoryTimers,
    resetAllCategoryTimers,
  } = useContext(TimerContext);

  const categoryTimers = timers.filter((timer) => timer.category === category);

  return (
    <View style={styles.categoryContainer}>
      {/* Category Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.titleContainer}
        >
          <Text style={styles.categoryTitle}>{category}</Text>
          <Text style={styles.toggleIcon}>{expanded ? "▲" : "▼"}</Text>
        </TouchableOpacity>

        {/* Bulk Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => startAllCategoryTimers(category)}>
            <Ionicons name="play" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pauseAllCategoryTimers(category)}>
            <Ionicons name="pause" size={24} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => resetAllCategoryTimers(category)}>
            <Ionicons name="refresh" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </View>

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
    alignItems: "center",
    padding: 15,
    backgroundColor: "lightblue",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
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
