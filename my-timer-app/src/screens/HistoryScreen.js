import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TimerContext } from "../context/TimerContext";

export default function HistoryScreen() {
  const { completedTimers, clearHistory } = useContext(TimerContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const confirmClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all timer history?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: clearHistory },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Completed Timers</Text>
        {completedTimers.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={confirmClearHistory}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {completedTimers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No completed timers yet</Text>
          <Text style={styles.emptySubtext}>
            Completed timers will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={completedTimers.sort(
            (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
          )}
          keyExtractor={(item) => item.id + item.completedAt}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: getCategoryColor(item.category) },
                  ]}
                >
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>
              <Text style={styles.itemDuration}>
                Duration: {item.duration} seconds
              </Text>
              <Text style={styles.itemDate}>
                Completed on: {formatDate(item.completedAt)}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

// Helper function to get category color
const getCategoryColor = (category) => {
  const colors = {
    Workout: "#FF9500",
    Study: "#5856D6",
    Break: "#34C759",
  };

  return colors[category] || "#007AFF";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8E8E93",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 8,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  itemDuration: {
    fontSize: 14,
    color: "#3C3C43",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: "#8E8E93",
  },
});
