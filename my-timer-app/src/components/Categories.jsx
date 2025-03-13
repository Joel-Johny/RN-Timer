import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TimerContext } from "../context/TimerContext";
import Category from "./Category";

export default function Categories() {
  const { categories } = useContext(TimerContext);

  return (
    <ScrollView style={styles.container}>
      {categories.length > 0 ? (
        categories.map((category) => (
          <Category key={category} category={category} />
        ))
      ) : (
        <Text style={styles.noCategoryText}>No categories found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  noCategoryText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "gray",
    padding: 20,
  },
});
