import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import withCustomHeader from "../../../components/withCustomHeader/withCustomHeader";
import { Colors } from "../../../constants/Colors";
import Plus from "../../../components/CustomButton/Plus";
import NoTodo from "../../../components/today/NoTodo";
import AddTodoModal from "../../../components/AddTodoModal";
import EditTodoModal from "../../../components/EditTodoModal"; 
import { useSQLiteContext } from "expo-sqlite";
import CheckBox from "react-native-check-box";

const Today = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const[refreshing,setRefreshing] = useState(false);

  const db = useSQLiteContext();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const filteredTodos = await db.getAllAsync("SELECT * FROM todos");
      setTodos(filteredTodos);
    } catch (error) {
      console.log("Error while fetching todos...", error);
    }
  };

  const handleCheckBoxClick = async (item) => {
    const newCheckedState = item.isChecked === 1 ? 0 : 1;
    try {
      await db.runAsync("UPDATE todos SET isChecked = ? WHERE id = ?", [
        newCheckedState,
        item.id,
      ]);

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === item.id ? { ...todo, isChecked: newCheckedState } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // const handlePress = (item) => {
  //   router.push({
  //     pathname: "/categoryDetails/Details",
  //     params: { item: JSON.stringify(item) },
  //   });
  // };

  const deleteTodo = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this todo?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: async () => {
            try {
              await db.runAsync("DELETE FROM todos WHERE id = ?", id);
              fetchTodos();
            } catch (error) {
              console.log("Error while deleting todo...", error);
            }
          }
        },
      ],
      { cancelable: true }
    );
  };

  const openEditModal = (todo) => {
    setEditTodo(todo);
    setEditModal(true);
  };

  const todoView = ({ item }) => (
    <View style={styles.todoContainer}>
      <View
        style={styles.todoContent}
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
        <TouchableOpacity style={styles.todoTextContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {item.task}
          </Text>
          <Text numberOfLines={1} style={styles.desc}>
            {item.desc}
          </Text>
          <Text style={styles.date}>{item.date}</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => deleteTodo(item.id)}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/128/2603/2603105.png" }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openEditModal(item)}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/128/143/143437.png" }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {todos.length === 0 ? (
          <NoTodo />
        ) : (
          <FlatList
            data={todos}
            renderItem={todoView}
            refreshing={refreshing}
            onRefresh={()=>fetchTodos()}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        )}
      </View>

      <Plus onPress={() => setShowModal(true)} />
      <AddTodoModal
        showModal={showModal}
        setShowModal={setShowModal}
        onTodoAdded={fetchTodos}
      />
      <EditTodoModal
        showModal={editModal}
        setShowModal={setEditModal}
        todo={editTodo}
        onUpdate={fetchTodos}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingBottom: 80,
    paddingTop: 20,
  },
  content: {
    flex: 1,
  },
  flatListContainer: {
    paddingHorizontal: 20,
  },
  todoContainer: {
    marginBottom: 10,
  },
  todoContent: {
    backgroundColor: Colors.dark,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
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
  todoTextContainer: {
    flex: 1,
    marginRight: 10,
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
    color: Colors.grey,
    fontWeight: "600",
    fontSize: 15,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
});

export default withCustomHeader(Today);