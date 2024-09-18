import {
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Text,
  StyleSheet
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import NoTodo from "../../components/today/NoTodo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Modal from "@/components/ModalData";
import { useSQLiteContext } from "expo-sqlite";

const Categories = () => {
  const [categoryTodos, setCategoryTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item) : null;
  const[refreshing,setRefreshing] = useState(false);

  const navigation = useNavigation();
  const db = useSQLiteContext();

  // custom header for the category specific todos
  useEffect(() => {
    // Set header options for the screen
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

  // fetchCategoryTodos when the component mounts
  useEffect(() => {
    fetchCategoryTodos();
  }, [parsedItem]);

  // Fetch todos for the selected category from the database
  const fetchCategoryTodos = async () => {
    try {
      if (parsedItem) {
        const todos = await db.getAllAsync(
          "SELECT * FROM todos WHERE selectedCategory = ?",
          parsedItem
        );
        setCategoryTodos(todos);
      }
    } catch (error) {
      console.error("Error fetching todos for category:", error);
    }
  };

  // route to the details screen
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
          overflow: "hidden",
        }}
      >
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
    <View
      style={{ backgroundColor: Colors.black, flex: 1, paddingVertical: 30 }}
    >
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />

      {categoryTodos.length === 0 ? (
        <NoTodo />
      ) : (
        <View>
          <FlatList
          refreshing={refreshing}
          onRefresh={()=>{fetchCategoryTodos()}}
            data={categoryTodos}
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
      )}
    </View>
  );
};

export default Categories;

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
  }
});