import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { TimerContext } from "../context/TimerContext";
import RNPickerSelect from "react-native-picker-select"; // Import dropdown

export default function AddTimerModal({ visible, setVisible }) {
  const { addTimer, categories } = useContext(TimerContext);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = () => {
    if (!name || !duration || !selectedCategory) return;

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration, 10),
      category: selectedCategory,
      elapsed: 0, // New field to track progress
      status: "Not yet started", // Default status
      completionTime: "Pending",
    };

    addTimer(newTimer);
    setVisible(false);
    setName("");
    setDuration("");
    setSelectedCategory("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Timer</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration (in seconds)"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />

          {/* Dropdown for Category Selection */}
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedCategory(value)}
              items={categories.map((category) => ({
                label: category,
                value: category,
              }))}
              style={pickerSelectStyles}
              placeholder={{ label: "Select a category...", value: null }}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save Timer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

// Custom styles for dropdown
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    width: "100%",
  },
  inputAndroid: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    width: "100%",
  },
};
