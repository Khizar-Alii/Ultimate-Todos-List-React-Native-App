import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const HabbitsList = ({ habbitsProps }) => {
  const [habbits, setHabbits] = useState([]);

  // Update todosListItems whenever filteredTodos changes
  useEffect(() => {
    const updateTodos = habbitsProps.map((todo) => ({
      ...todo,
    }));
    setHabbits(updateTodos);
  }, [habbitsProps]);

  //habbitsView component

  const habbitsView = ({ item }) => {};

  return (
    <View>
      <FlatList
        data={habbits}
        renderItem={habbitsView}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </View>
  );
};

export default HabbitsList;

const styles = StyleSheet.create({});
