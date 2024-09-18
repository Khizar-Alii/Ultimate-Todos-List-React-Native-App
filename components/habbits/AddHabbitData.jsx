import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSQLiteContext } from "expo-sqlite";

const AddHabbitData = ({ setShowModal, onHabbitAdded }) => {
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [habitName, setHabitName] = useState("");
  const [desc, setDesc] = useState("");
  const [frequency, setFrequency] = useState("Daily");

  // this component is to add the habbit into the database

  const db = useSQLiteContext();

  const handleSubmitData = async () => {
    if (!date || !habitName) {
      Alert.alert("Warning", "Please provide at least a Habit Name and Date.");
      return;
    }
    try {
      await db.runAsync(
        "INSERT INTO habits (habitName, description, category, habitDate, frequency) VALUES (?, ?, ?, ?, ?)",
        [habitName, desc, selectedCategory, date.toDateString(), frequency]
      );

      onHabbitAdded();
      setShowModal(false);
      Alert.alert("Success", "Habit Added successfully");
    } catch (error) {
      console.log("Error while adding habits...", error);
      Alert.alert("Error", "Failed to add Habit. Please try again.");
    }
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Habit Name</Text>
        <TextInput
          style={styles.value}
          placeholder="e.g Drink Juice After Waking Up"
          value={habitName}
          onChangeText={(value) => setHabitName(value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.value}
          placeholder="e.g Buy Fruits for tomorrow juice"
          value={desc}
          onChangeText={(value) => setDesc(value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Added Date</Text>
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
            style={{ position: "absolute", right: 5, bottom: 5 }}
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Other" value="Other" />
          <Picker.Item label="Work" value="Work" />
          <Picker.Item label="Personal" value="Personal" />
          <Picker.Item label="Family" value="Family" />
          <Picker.Item label="Sport" value="Sport" />
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Frequency</Text>
        <Picker
          selectedValue={frequency}
          onValueChange={(itemValue) => setFrequency(itemValue)}
        >
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Weekly" value="Weekly" />
          <Picker.Item label="Monthly" value="Monthly" />
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

export default AddHabbitData;