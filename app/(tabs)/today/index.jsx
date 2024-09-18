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
// TO define the same header for everyscreen , so i made a highOrder function which take component as a prop and then in that i set the Custom header
import withCustomHeader from "../../../components/withCustomHeader/withCustomHeader";
import { Colors } from "../../../constants/Colors";
import Plus from "../../../components/CustomButton/Plus";
import NoTodo from "../../../components/today/NoTodo";
import AddTodoModal from "../../../components/AddTodoModal";
import EditTodoModal from "../../../components/EditTodoModal"; 
import { useSQLiteContext } from "expo-sqlite";
import CheckBox from "react-native-check-box";
import { router } from "expo-router";

const Today = () => {
  const [todos, setTodos] = useState([]); //store all the todos
  const [showModal, setShowModal] = useState(false); // to open a modal for adding todos
  const [editModal, setEditModal] = useState(false); // to open a edit todo modal
  const [editTodo, setEditTodo] = useState(null);// pass the todo to edit
  const[refreshing,setRefreshing] = useState(false); // to refresh the todos

  const db = useSQLiteContext();

  useEffect(() => {
    // when mount Get all todos
    fetchTodos();
  }, []);


  // to fetch all the todos from the sqllite DB
  const fetchTodos = async () => {
    try {
      const filteredTodos = await db.getAllAsync("SELECT * FROM todos");
      setTodos(filteredTodos);
    } catch (error) {
      console.log("Error while fetching todos...", error);
    }
  };


  // function when you click on the checkbox it mark the checkbox is checked and then update the checkbox in DB and the todos list
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



  // route to the details screen and to show the details of the todo
  const handlePress = (item) => {
    router.push({
      pathname: "/categoryDetails/Details",
      params: { item: JSON.stringify(item) },
    });
  };

  // function to delete the todo from database
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

  // function to accept the current todo and open the edit modal
  const openEditModal = (todo) => {
    setEditTodo(todo);
    setEditModal(true);
  };

  // passed this view to the flatlist which accepts the item as a param and responsible for the display of the content
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
        <TouchableOpacity style={styles.todoTextContainer} onPress={()=>handlePress(item)}>
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
          <NoTodo /> // just a picture and a text that says no todo
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
      {/* plus opens a modal to add the todo */}
      <Plus onPress={() => setShowModal(true)} /> 
        {/* AddTodoModal this component/modal takes props showModal setShowModal and onTodoAdded -> showModal & setShowModal to handle open and close modal and onTodoAdded passed this when todo is added update the todos in Ui */}
      <AddTodoModal
        showModal={showModal}
        setShowModal={setShowModal}
        onTodoAdded={fetchTodos}
      />
      {/* EditTodoModal this component/modal takes props showModal setShowModal and todo,onUpdate -> showModal & setShowModal to handle open and close modal and todo is the current todo to be edit & onUpdate to call the fetchTodos after editing so the updated todo can be seen. */}
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