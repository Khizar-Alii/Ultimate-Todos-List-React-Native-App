import { TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import { todos } from "../../constants/Todos";
import NoTodo from "../../components/today/NoTodo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import TodosList from "../../components/today/TodosList";
import Modal from "@/components/ModalData"; 

const categories = () => {
  const [categoryTodos, setCategoryTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item) : null;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: "#000000",
      },
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity
          style={{ paddingHorizontal: 20, alignItems: "center" }}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome6
            name="bars-staggered"
            size={20}
            color={Colors.primary}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={{ paddingHorizontal: 10 }}>
            <Image
              source={{
                uri: "https://lh3.google.com/u/0/ogw/AF2bZyhwcFddRCZA27biTphjJWqx77m4t7KJSG8rOwncStVqSQ=s32-c-mo",
              }}
              style={{ width: 30, height: 30, borderRadius: 99 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    let filterTodos = todos.filter((todo) => todo.category === parsedItem.name);
    setCategoryTodos(filterTodos);
  }, [todos]);

  return (
    <View
      style={{ backgroundColor: Colors.black, flex: 1, paddingVertical: 30 }}
    >
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      {/* <Text style={{fontSize : 20,color:'white'}}>Explore</Text> */}

      {categoryTodos.length === 0 ? (
        <NoTodo />
      ) : (
        <TodosList filteredTodos={categoryTodos} />
      )}
    </View>
  );
};

export default categories;