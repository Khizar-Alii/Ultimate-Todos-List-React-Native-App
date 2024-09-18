import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSQLiteContext } from "expo-sqlite";

const EditTodoModal = ({ showModal, setShowModal, todo, onUpdate }) => {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const db = useSQLiteContext();

  useEffect(() => {
    if (todo) {
      setTask(todo.task);
      setDesc(todo.desc);
      setDate(todo.date ? new Date(todo.date) : null);
    }
  }, [todo]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleUpdateTodo = async () => {
    try {
      await db.runAsync(
        "UPDATE todos SET task = ?, desc = ?, date = ? WHERE id = ?",
        [task, desc, date ? date.toISOString().split("T")[0] : null, todo.id]
      );
      setShowModal(false);
      onUpdate(); // Refresh the todos list
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Todo</Text>
          <TextInput
            style={styles.input}
            placeholder="Task"
            placeholderTextColor={Colors.grey}
            value={task}
            onChangeText={setTask}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor={Colors.grey}
            value={desc}
            onChangeText={setDesc}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity
              style={styles.dateBtn}
              onPress={showDatePickerHandler}
            >
              <Text style={styles.dateText}>
                {date ? date.toISOString().split("T")[0] : "Select a date"}
              </Text>
              <Ionicons
                name="calendar-number-outline"
                size={24}
                color={Colors.white}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              color={Colors.grey}
              onPress={() => setShowModal(false)}
            />
            <Button
              title="Update Todo"
              color={Colors.primary}
              onPress={handleUpdateTodo}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Colors.dark,
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.lightGrey,
    color: Colors.white,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  dateBtn: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: Colors.primary,
    marginBottom: 5,
  },
  dateText: {
    color: Colors.white,
    flex: 1,
  },
  icon: {
    marginLeft: 5,
  },
});

export default EditTodoModal;