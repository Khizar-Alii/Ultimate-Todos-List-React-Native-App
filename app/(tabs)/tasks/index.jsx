import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import withCustomHeader from "../../../components/withCustomHeader/withCustomHeader";
import useTodayDate from "../../../hooks/useTodayDate";
import { todos } from "../../../constants/Todos";
import NoTodo from "../../../components/today/NoTodo";
import TodosList from "../../../components/today/TodosList";
import { Colors } from "../../../constants/Colors";

const Tasks = () => {
  const { days, todayIndex, setTodayIndex } = useTodayDate();
  const [todayTodos, setTodayTodos] = useState([]);
  const [filterTasks, setFilterTasks] = useState([]);
  useEffect(() => {
    // today todos
    const today = days[todayIndex];
    if (today) {
      const dateParts = today?.split(" ");
      const formattedDate = `${dateParts[1]} ${dateParts[2]}, ${dateParts[3]}`;
      const filtered = todos.filter((todo) => todo.date === formattedDate);
      setTodayTodos(filtered);
    }

    if (today) {
      const dateParts = today.split(" ");
      const todayFormattedDate = `${dateParts[1]} ${dateParts[2]}, ${dateParts[3]}`;
      const filteredOtherTodos = todos.filter(
        (todo) => todo.date !== todayFormattedDate
      );
      setFilterTasks(filteredOtherTodos);
    }
  }, [days, todayIndex, todos]);
  return (
    <View style={{ backgroundColor: Colors.black, flex: 1, paddingBottom : 80 }}>
      <Text style={styles.title}>Today</Text>
      {/* Show this when todos are empty or not */}
      {todayTodos.length === 0 ? (
        <NoTodo />
      ) : (
        <View style={{flex : 1}}>
                  <TodosList filteredTodos={todayTodos} />
        </View>
      )}

      <Text style={styles.title}>All Task</Text>
      {/* Show this when todos are empty or not */}
      {filterTasks.length === 0 ? (
        <NoTodo />
      ) : (
        <View style={{flex : 1}}>
                  <TodosList filteredTodos={filterTasks} />
        </View>
      )}
    </View>
  );
};

export default withCustomHeader(Tasks);

const styles = StyleSheet.create({
  todayContainer: {
    padding: 20,
  },
  title: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: "700",
    padding:20
  },
});
