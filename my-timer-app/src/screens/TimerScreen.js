import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import Categories from "../components/Categories";
import AddTimerModal from "../components/AddTimerModal"; // Import modal component

export default function TimerScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Add Timer Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Timer</Text>
      </TouchableOpacity>

      {/* Categories Section */}
      <Categories />

      {/* Add Timer Modal Component */}
      <AddTimerModal visible={modalVisible} setVisible={setModalVisible} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
  },
});
