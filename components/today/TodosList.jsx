import { StyleSheet, Text, View, FlatList, Animated ,TouchableOpacity} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../../constants/Colors";
import CheckBox from "react-native-check-box";
import { router } from "expo-router";


const TodosList = ({ filteredTodos }) => {  
  
  const [todosListItems, setTodosListItems] = useState([]);

  // Update todosListItems whenever filteredTodos changes
  useEffect(() => {
    const todosWithAnimation = filteredTodos.map((todo) => ({
      ...todo,
      slideAnimation: new Animated.Value(0),
    }));
    setTodosListItems(todosWithAnimation);
  }, [filteredTodos]);

  // Handle checkbox toggle and slide animation
  const handleCheckBoxClick = (id) => {
    setTodosListItems((prevState) => {
      const updatedTodos = prevState.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, isChecked: !todo.isChecked };

          if (updatedTodo.isChecked) {
            // Start slide animation
            Animated.timing(todo.slideAnimation, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }).start(() => {
              setTodosListItems((prevState) =>
                prevState.filter((t) => t.id !== id)
              );
            });
          }

          return updatedTodo;
        }
        return todo;
      });

      return updatedTodos;
    });
  };

  const handlePress = (item) =>{
    router.push({
      pathname: "/categoryDetails/Details",
      params: { item: JSON.stringify(item) }, 
    });
  }

  const todoView = ({ item }) => {
    const translateX = item.slideAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 400],
    });

    return (
      <Animated.View
        style={[styles.todoContainer, { transform: [{ translateX }] }]}
      >
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
              onClick={() => handleCheckBoxClick(item.id)}
              style={styles.checkbox}
              isChecked={item.isChecked}
              checkedCheckBoxColor={Colors.primary}
            />
          </View>
          <TouchableOpacity onPress={()=>handlePress(item)
          }>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.desc}>
              {item.desc}
            </Text>
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

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
  flatListContainer: {
  },
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