import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import withCustomHeader from "../../../components/withCustomHeader/withCustomHeader";
import NoTodo from "../../../components/today/NoTodo";
import { Colors } from "../../../constants/Colors";
import { useSQLiteContext } from "expo-sqlite";
import CheckBox from "react-native-check-box";
import { router } from "expo-router";

const Tasks = () => {
  const [finishedTask, setFinishedTask] = useState([]);
  const [remainingTasks, setRemainingTasks] = useState([]);
  const db = useSQLiteContext();

  // Fetch both remaining and finished todos on initial mount and after a todo is updated
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await fetchRemainingTodos();
    await fetchFinishedTodos();
  };

  const fetchRemainingTodos = async () => {
    try {
      const remaining = await db.getAllAsync('SELECT * FROM todos WHERE isChecked = 0');
      setRemainingTasks(remaining);
    } catch (error) {
      console.log("Error while fetching remaining todos...", error);
    }
  };

  const fetchFinishedTodos = async () => {
    try {
      const finished = await db.getAllAsync('SELECT * FROM todos WHERE isChecked = 1');
      setFinishedTask(finished);
    } catch (error) {
      console.log("Error while fetching finished todos...", error);
    }
  };

  return (
    <View style={{ backgroundColor: Colors.black, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Remaining</Text>
        {remainingTasks.length === 0 ? (
          <NoTodo />
        ) : (
          <View>
            <TodosList filteredTodos={remainingTasks} onTodoUpdate={fetchTodos} />
          </View>
        )}

        <Text style={styles.heading}>Finished</Text>
        {finishedTask.length === 0 ? (
          <NoTodo />
        ) : (
          <View>
            <TodosList filteredTodos={finishedTask} onTodoUpdate={fetchTodos} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default withCustomHeader(Tasks);

const TodosList = ({ filteredTodos, onTodoUpdate }) => {
  const [todosListItems, setTodosListItems] = useState(filteredTodos);
  const db = useSQLiteContext();

  useEffect(() => {
    setTodosListItems(filteredTodos);
  }, [filteredTodos]);

  const handleCheckBoxClick = async (item) => {
    const newCheckedState = item.isChecked === 1 ? 0 : 1;
    try {
      await db.runAsync('UPDATE todos SET isChecked = ? WHERE id = ?', [newCheckedState, item.id]);
      onTodoUpdate();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handlePress = (item) => {
    router.push({
      pathname: "/categoryDetails/Details",
      params: { item: JSON.stringify(item) },
    });
  };

  const todoView = ({ item }) => (
    <View style={styles.todoContainer}>
      <View style={styles.todoContent}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checkBoxColor={Colors.grey}
            onClick={() => handleCheckBoxClick(item)}
            style={styles.checkbox}
            isChecked={item.isChecked === 1}
            checkedCheckBoxColor={Colors.primary}
          />
        </View>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <Text numberOfLines={1} style={styles.title}>
            {item.task}
          </Text>
          <Text numberOfLines={1} style={styles.desc}>
            {item.desc}
          </Text>
          <Text style={styles.date}>{item.date}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      {filteredTodos.map((item) => (
        <View key={item.id} style={styles.flatListContainer}>
          {todoView({ item })}
        </View>
      ))}
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 80,
  },
  heading: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: "700",
    padding: 20,
  },
  flatListContainer: {
    marginBottom: 10,
  },
  todoContainer: {
    display: "flex",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  todoContent: {
    backgroundColor: Colors.dark,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 15,
    flexDirection: "row",
    gap: 4,
    overflow: "hidden",
  },
  title: {
    color: Colors.light,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
  desc: {
    color: Colors.grey,
    fontWeight: "300",
    fontSize: 12,
    paddingVertical: 4,
  },
  date: {
    color: Colors.black,
    fontWeight: "600",
    fontSize: 15,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    transform: [{ scale: 0.7 }],
  },
});