import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { todos } from "../../constants/Todos";
const AddTodoData = ({ setShowModal }) => {
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [task, setTask] = useState();
  const [desc, setDesc] = useState();
  

  // Handle date picker change
  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  // Open date picker when TouchableOpacity is clicked
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  // submitting the Todo

  const handleSubmitData = () => {
    if (!date && !task) {
      Alert.alert(
        "Warning",
        "Plesae! Minimum Provide Task and Date to Submit..."
      );
      return;
    }
    todos.push({
        id: Date.now(),
        title: task,
        desc: desc,
        date: date,
        isChecked: false,
        category : selectedCategory,
      });
    setShowModal(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>What is to be done?</Text>
        <TextInput
          style={styles.value}
          placeholder="e.g Finish homework before 12."
          keyboardType="default"
          onChangeText={(value) => setTask(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description of Task</Text>
        <TextInput
          style={styles.value}
          placeholder="e.g Share the Homework with the teacher"
          keyboardType="default"
          onChangeText={(value) => setTask(value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity
          style={styles.dateBtn}
          onPress={showDatePickerHandler}
        >
          <Text style={{ color: Colors.grey }}>
            {date ? date.toDateString() : "Select a date"}
          </Text>
          <Ionicons
            name="calendar-number-outline"
            size={24}
            color="black"
            style={{
              position: "absolute",
              right: 5,
              bottom: 5,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Date Picker component */}
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          selected
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Add to Category</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
        >
          <Picker.Item label="Other" value="Other" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Family" value="Family" />
          <Picker.Item label="Sport" value="Sport" />
        </Picker>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <TouchableOpacity style={styles.addTodoBtn} onPress={handleSubmitData}>
          <MaterialIcons name="done" size={20} color={Colors.light} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addTodoBtn}
          onPress={() => setShowModal(false)}
        >
          <MaterialIcons name="close" size={20} color={Colors.light} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTodoData;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
  },
  label: {
    color: Colors.dark,
    fontSize: 15,
    letterSpacing: 1,
    paddingHorizontal: 4,
  },
  value: {
    borderWidth: 1,
    borderColor: Colors.light,
    padding: 4,
    borderRadius: 10,
    marginVertical: 8,
  },
  dateBtn: {
    marginVertical: 6,
    padding: 2,
    borderBottomWidth: 1,
    borderColor: Colors.light,
    flexDirection: "row",
  },
  addTodoBtn: {
    padding: 10,
    backgroundColor: Colors.primaryLight,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 99,
  },
});