import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TimerContext } from "../context/TimerContext";
import Category from "./Category";

export default function Categories() {
  const { categories } = useContext(TimerContext);

  return (
    <View style={styles.container}>
      {categories.length > 0 ? (
        categories.map((category) => {
          // Get timers belonging to this category
          return <Category key={category} category={category} />;
        })
      ) : (
        <Text style={styles.noCategoryText}>No categories found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  noCategoryText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
});
