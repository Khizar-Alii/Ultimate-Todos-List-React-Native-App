import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import CheckBox from "react-native-check-box";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite"; 

const TodosList = ({ filteredTodos }) => {
  const [todosListItems, setTodosListItems] = useState(filteredTodos);
  const db = useSQLiteContext(); 


  // Handle checkbox toggle
  const handleCheckBoxClick = async (item) => {
    const newCheckedState = item.isChecked === 1 ? 0 : 1;
    try {
      // Update the isChecked state in the database
      await db.runAsync('UPDATE todos SET isChecked = ? WHERE id = ?', [newCheckedState, item.id]);

      // Update the local state to reflect the change
      setTodosListItems((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === item.id ? { ...todo, isChecked: newCheckedState } : todo
        )
      );
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
      <View
        style={{
          backgroundColor: Colors.dark,
          paddingVertical: 10,
          paddingHorizontal: 4,
          borderRadius: 15,
          flexDirection: "row",
          gap: 4,
          overflow: 'hidden',
        }}
      >
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

export default TodosList;

const styles = StyleSheet.create({
  flatListContainer: {},
  todoContainer: {
    display: "flex",
    paddingHorizontal: 20,
    paddingVertical: 10,
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