import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import withCustomHeader from "../../../components/withCustomHeader/withCustomHeader";
import useTodayDate from "../../../hooks/useTodayDate";
import { Colors } from "../../../constants/Colors";
import Plus from "../../../components/CustomButton/Plus";
import { todos } from "../../../constants/Todos";
import NoTodo from "../../../components/today/NoTodo";
import TodosList from "../../../components/today/TodosList";
import AddTodoModal from "../../../components/AddTodoModal";

const Today = () => {
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // call the custom hook which returns the days and todayIndex
  const { days, todayIndex, setTodayIndex } = useTodayDate();

  // Filter todos based on the initial date when the component mounts
  useEffect(() => {
    const initialDate = days[todayIndex]; // e.g., "Sat 14 Sep 2024"
    if (initialDate) {
      const dateParts = initialDate.split(" ");
      const formattedDate = `${dateParts[1]} ${dateParts[2]}, ${dateParts[3]}`; // "14 Sep, 2024"
      const filtered = todos.filter((todo) => todo.date === formattedDate);
      setFilteredTodos(filtered);
    }
  }, [days, todayIndex]);

  // this function will filter todos when a new date is selected
  const handlePress = (index) => {
    setTodayIndex(index);
    const selectedDate = days[index]; // e.g., "Sat 14 Sep 2024"
    const dateParts = selectedDate.split(" ");
    const formattedDate = `${dateParts[1]} ${dateParts[2]}, ${dateParts[3]}`;

    // Filter todos based on the selected date
    const filtered = todos.filter((todo) => todo.date === formattedDate);
    setFilteredTodos(filtered);
  };

  // to represent the today's date
  const DateView = ({ item, index }) => {
    const isToday = index === todayIndex;
    const day = item.split(" ")[0]; // "Thu"
    const date = item.split(" ")[1]; // "12"
    const month = item.split(" ")[2]; // "Sep"
    const year = item.split(" ")[3]; // "2024"
    return (
      <TouchableOpacity
        style={styles.dayContainer}
        onPress={() => handlePress(index)}
      >
        <View
          style={[
            styles.dayContent,
            isToday ? styles.activeDayContent : styles.inActiveDayContent,
          ]}
        >
          <Text
            style={[
              styles.dayText,
              isToday ? styles.activeText : styles.inactiveText,
            ]}
          >
            {day}
          </Text>
          <Text
            style={[
              styles.dateText,
              isToday ? styles.activeDateText : styles.inactiveText,
            ]}
          >
            {date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: Colors.black, flex: 1,paddingBottom : 80 }}>
      {/* to create a date view on top */}
      <View>
        <FlatList
          data={days}
          renderItem={DateView}
          keyExtractor={(item) => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          initialScrollIndex={todayIndex}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
        />
      </View>

      <View style={{flex : 1}}>
        {/* Show this when todos are empty or not */}
        {filteredTodos.length === 0 ? (
          <NoTodo />
        ) : (
          <TodosList filteredTodos={filteredTodos} />
        )}
      </View>

      {/* plus icon to add the todos */}
      <Plus onPress={() => setShowModal(true)} />
      <AddTodoModal showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 20,
  },
  dayContainer: {
    width: 80,
    alignItems: "center",
  },
  dayContent: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDayContent: {
    backgroundColor: Colors.primary,
  },
  inActiveDayContent: {
    backgroundColor: Colors.dark,
  },
  dayText: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeDateText: {
    color: Colors.light,
    backgroundColor: Colors.primaryLight,
    borderRadius: 99,
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  activeText: {
    color: Colors.light,
  },
  inactiveText: {
    color: "#999999",
  },
});

export default withCustomHeader(Today);
