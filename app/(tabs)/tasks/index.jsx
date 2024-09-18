import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
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

  // to get both the finished tasks and remaining tasks
  const fetchTodos = async () => {
    await fetchRemainingTodos();
    await fetchFinishedTodos();
  };

  // to get and remaining tasks
  const fetchRemainingTodos = async () => {
    try {
      const remaining = await db.getAllAsync('SELECT * FROM todos WHERE isChecked = 0');
      setRemainingTasks(remaining);
    } catch (error) {
      console.log("Error while fetching remaining todos...", error);
    }
  };
  // to get and finished tasks
  const fetchFinishedTodos = async () => {
    try {
      const finished = await db.getAllAsync('SELECT * FROM todos WHERE isChecked = 1');
      setFinishedTask(finished);
    } catch (error) {
      console.log("Error while fetching finished todos...", error);
    }
  };

  return (
    <View style={{ backgroundColor: Colors.black, flex: 1, paddingBottom: 80 }}>
      <Text style={styles.heading}>Remaining</Text>
      {remainingTasks.length === 0 ? (
        <NoTodo />
      ) : (
        <View style={{ flex: 1 }}>
          <TodosList filteredTodos={remainingTasks} onTodoUpdate={fetchTodos} />
        </View>
      )}

      <Text style={styles.heading}>Finished</Text>
      {finishedTask.length === 0 ? (
        <NoTodo />
      ) : (
        <View style={{ flex: 1 }}>
          <TodosList filteredTodos={finishedTask} onTodoUpdate={fetchTodos} />
        </View>
      )}
    </View>
  );
};

export default withCustomHeader(Tasks);

// TodosList component to display the list of todos (both remaining and finished)
const TodosList = ({ filteredTodos, onTodoUpdate }) => {
  const[refresing,setRefreshing] = useState(false)
  const [todosListItems, setTodosListItems] = useState(filteredTodos);
  const db = useSQLiteContext();

  useEffect(() => {
    setTodosListItems(filteredTodos); 
  }, [filteredTodos]);

  // Handle checkbox toggle
  const handleCheckBoxClick = async (item) => {
    const newCheckedState = item.isChecked === 1 ? 0 : 1;
    try {
      // Update the isChecked state in the database
      await db.runAsync('UPDATE todos SET isChecked = ? WHERE id = ?', [newCheckedState, item.id]);

      // Refetch the todos to update the UI
      onTodoUpdate();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  // route to the details screen to see the details of the todo
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
      <FlatList
      refreshing={refresing}
      onRefresh={()=>onTodoUpdate()}
        data={todosListItems}
        renderItem={todoView}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  heading: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: "700",
    padding: 20,
  },
  flatListContainer: {},
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