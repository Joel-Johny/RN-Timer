import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      {/* Categories List Will Go Here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
