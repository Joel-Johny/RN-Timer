import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { TimerContext } from "../context/TimerContext";

export default function AddTimerModal({ visible, setVisible }) {
  const { addTimer, categories, addCategory } = useContext(TimerContext);

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const resetForm = () => {
    setName("");
    setDuration("");
    setSelectedCategory("");
    setNewCategory("");
    setShowAddCategory(false);
  };

  const handleClose = () => {
    resetForm();
    setVisible(false);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      Alert.alert("Error", "Please enter a category name");
      return;
    }

    addCategory(newCategory.trim());
    setSelectedCategory(newCategory.trim());
    setNewCategory("");
    setShowAddCategory(false);
  };

  const handleSubmit = () => {
    // Validate inputs
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a timer name");
      return;
    }

    if (
      !duration.trim() ||
      isNaN(parseInt(duration, 10)) ||
      parseInt(duration, 10) <= 0
    ) {
      Alert.alert("Error", "Please enter a valid duration in seconds");
      return;
    }

    if (!selectedCategory) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    // Create new timer object
    const newTimer = {
      id: Date.now().toString(),
      name: name.trim(),
      duration: parseInt(duration, 10),
      category: selectedCategory,
      elapsed: 0,
      status: "Not yet started",
    };

    // Add to context
    addTimer(newTimer);

    // Reset form and close modal
    resetForm();
    setVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <View style={styles.handle} />

          <Text style={styles.modalTitle}>Create New Timer</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Timer Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter timer name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Duration (seconds)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter duration in seconds"
              keyboardType="number-pad"
              value={duration}
              onChangeText={setDuration}
            />
          </View>

          {!showAddCategory ? (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={(value) => setSelectedCategory(value)}
                  items={categories.map((category) => ({
                    label: category,
                    value: category,
                  }))}
                  placeholder={{ label: "Select a category...", value: null }}
                  style={pickerSelectStyles}
                  value={selectedCategory}
                />
              </View>
              <TouchableOpacity
                style={styles.addCategoryButton}
                onPress={() => setShowAddCategory(true)}
              >
                <Text style={styles.addCategoryText}>+ Add New Category</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formGroup}>
              <Text style={styles.label}>New Category</Text>
              <View style={styles.newCategoryContainer}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter category name"
                  value={newCategory}
                  onChangeText={setNewCategory}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleAddCategory}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddCategory(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelModalButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleSubmit}
            >
              <Text style={styles.createButtonText}>Create Timer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F5F5F5",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    marginBottom: 8,
  },
  addCategoryButton: {
    paddingVertical: 8,
  },
  addCategoryText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  newCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginLeft: 8,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
  },
  cancelButton: {
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: "#FF3B30",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelModalButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },
  cancelModalButtonText: {
    color: "#8E8E93",
    fontWeight: "600",
  },
  createButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

// Custom styles for the picker
const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "black",
  },
  placeholder: {
    color: "#8E8E93",
  },
};
