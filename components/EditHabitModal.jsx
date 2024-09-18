import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useSQLiteContext } from "expo-sqlite";

const EditHabitModal = ({ showModal, setShowModal, habit, onUpdate }) => {
  const [habitName, setHabitName] = useState("");
  const [description, setDescription] = useState("");


    // this is the edit habbit modal  which takes showModal & setshowmodal to handle opening and closing of modal and habit which is to be edited and onUpdate to update the ui immediately after the editing the todo

  const db = useSQLiteContext();

  useEffect(() => {
    if (habit) {
      setHabitName(habit.habitName);
      setDescription(habit.description);
    }
  }, [habit]);

  const handleUpdate = async () => {
    if (!habitName) {
      Alert.alert("Warning", "Please provide a Habit Name.");
      return;
    }
    try {
      await db.runAsync(
        "UPDATE habits SET habitName = ?, description = ? WHERE id = ?",
        [habitName, description, habit.id]
      );
      setShowModal(false);
      onUpdate(); // Refresh the habits list
      Alert.alert("Success", "Habit updated successfully");
    } catch (error) {
      console.log("Error while updating habit...", error);
      Alert.alert("Error", "Failed to update Habit. Please try again.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(!showModal)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.label}>Habit Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={(text) => setHabitName(text)}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: Colors.dark,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: Colors.greyDark,
    color: Colors.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.grey,
  },
  updateButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default EditHabitModal;