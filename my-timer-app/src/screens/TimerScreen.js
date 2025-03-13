import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { TimerContext } from "../context/TimerContext";
import Categories from "../components/Categories";
import AddTimerModal from "../components/AddTimerModal";

export default function TimerScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { showCompletionModal, completedTimerInfo, hideCompletionModal } =
    useContext(TimerContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Add Timer Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add New Timer</Text>
        </TouchableOpacity>

        {/* Categories Section */}
        <Categories />

        {/* Add Timer Modal */}
        <AddTimerModal visible={modalVisible} setVisible={setModalVisible} />

        {/* Timer Completion Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showCompletionModal}
          onRequestClose={hideCompletionModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Timer Completed!</Text>

              {completedTimerInfo && (
                <Text style={styles.modalText}>
                  You have successfully completed the timer: "
                  {completedTimerInfo.name}"
                </Text>
              )}

              <TouchableOpacity
                style={styles.modalButton}
                onPress={hideCompletionModal}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#007AFF",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
