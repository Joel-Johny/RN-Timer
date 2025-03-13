import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TimerContext } from "../context/TimerContext";
import Timer from "./Timer";

export default function Category({ category, timerCount }) {
  const [expanded, setExpanded] = useState(false);
  const {
    timers,
    startAllCategoryTimers,
    pauseAllCategoryTimers,
    resetAllCategoryTimers,
    deleteCategory,
  } = useContext(TimerContext);

  // Get all timers for this category
  const categoryTimers = timers.filter((timer) => timer.category === category);

  // Check if any timer in this category is running
  const isAnyTimerRunning = categoryTimers.some(
    (timer) => timer.status === "Running"
  );

  const handleStartAll = () => {
    startAllCategoryTimers(category);
  };

  const handlePauseAll = () => {
    pauseAllCategoryTimers(category);
  };

  const handleResetAll = () => {
    Alert.alert(
      "Reset All Timers",
      `Are you sure you want to reset all timers in "${category}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", onPress: () => resetAllCategoryTimers(category) },
      ]
    );
  };

  const handleDeleteCategory = () => {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete "${category}" and all its timers?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteCategory(category),
        },
      ]
    );
  };

  // Get the category color based on the category name
  const getCategoryColor = () => {
    const colors = {
      Workout: "#FF9500",
      Study: "#5856D6",
      Break: "#34C759",
    };

    return colors[category] || "#007AFF";
  };

  const categoryColor = getCategoryColor();

  return (
    <View style={[styles.container, { borderLeftColor: categoryColor }]}>
      {/* Category Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.categoryName}>{category}</Text>
          <View style={[styles.badge, { backgroundColor: categoryColor }]}>
            <Text style={styles.badgeText}>{timerCount}</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.categoryAction, styles.deleteAction]}
            onPress={handleDeleteCategory}
          >
            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>

          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#8E8E93"
          />
        </View>
      </TouchableOpacity>

      {/* Category Content (when expanded) */}
      {expanded && (
        <View style={styles.content}>
          {/* Category Actions */}
          {timerCount > 0 && (
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleStartAll}
                disabled={isAnyTimerRunning}
              >
                <Ionicons
                  name="play"
                  size={18}
                  color={isAnyTimerRunning ? "#8E8E93" : "#34C759"}
                />
                <Text
                  style={[
                    styles.actionText,
                    { color: isAnyTimerRunning ? "#8E8E93" : "#34C759" },
                  ]}
                >
                  Start All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handlePauseAll}
                disabled={!isAnyTimerRunning}
              >
                <Ionicons
                  name="pause"
                  size={18}
                  color={!isAnyTimerRunning ? "#8E8E93" : "#FF9500"}
                />
                <Text
                  style={[
                    styles.actionText,
                    { color: !isAnyTimerRunning ? "#8E8E93" : "#FF9500" },
                  ]}
                >
                  Pause All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleResetAll}
              >
                <Ionicons name="refresh" size={18} color="#007AFF" />
                <Text style={[styles.actionText, { color: "#007AFF" }]}>
                  Reset All
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Timers List */}
          <View style={styles.timersList}>
            {categoryTimers.length > 0 ? (
              categoryTimers.map((timer) => (
                <Timer key={timer.id} timer={timer} />
              ))
            ) : (
              <Text style={styles.emptyText}>
                No timers in this category. Add one!
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  badge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryAction: {
    padding: 8,
    marginRight: 8,
  },
  deleteAction: {
    marginRight: 12,
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: "#F2F2F7",
  },
  actionsContainer: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
    backgroundColor: "#F9F9F9",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "500",
  },
  timersList: {
    padding: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#8E8E93",
    paddingVertical: 16,
    fontStyle: "italic",
  },
});
