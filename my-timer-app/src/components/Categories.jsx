import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TimerContext } from "../context/TimerContext";
import Category from "./Category";

export default function Categories() {
  const { categories, timers } = useContext(TimerContext);

  // Count timers in each category
  const getTimerCount = (category) => {
    return timers.filter((timer) => timer.category === category).length;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Timer Categories</Text>

      {categories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No categories yet</Text>
          <Text style={styles.emptySubtext}>
            Add a timer to create categories
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.categoriesList}>
          {categories.map((category) => (
            <Category
              key={category}
              category={category}
              timerCount={getTimerCount(category)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginHorizontal: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8E8E93",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
  },
});
