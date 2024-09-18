import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ModalData";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";


const Details = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item) : null;
  const navigation = useNavigation();
// custom header for navigation screen
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


 // this just display the details of the todo with some icons
  return (
    <View style={styles.screen}>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <View style={styles.card}>
        <View style={styles.data}>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Category</Text>
            <Image
              style={styles.icon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/8847/8847455.png",
              }}
            />
          </View>
          <Text style={styles.value}>{parsedItem?.selectedCategory}</Text>
        </View>

        <View style={styles.data}>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Title</Text>
            <Image
              style={styles.icon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/14090/14090371.png",
              }}
            />
          </View>
          <Text style={styles.value}>{parsedItem?.task}</Text>
        </View>

        <View style={styles.data}>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Description</Text>
            <Image
              style={styles.icon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/14793/14793459.png",
              }}
            />
          </View>
          <Text style={styles.value}>{parsedItem?.desc}</Text>
        </View>

        <View style={styles.data}>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Due Date</Text>
            <Image
              style={styles.icon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/3652/3652191.png",
              }}
            />
          </View>
          <Text style={styles.value}>{parsedItem?.date}</Text>
        </View>
        <View style={[styles.data, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
          <Text style={styles.label}>Completed</Text>
          <Text style={styles.value}>{parsedItem?.isChecked == 0 ? "Not Completed" : 'Completed'}</Text>
        </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.black,
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 30,
  },
  data: {
    marginBottom: 20,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    fontSize: 16,
    color: Colors.light,
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
    color: Colors.grey,
    fontWeight: "600",
    marginTop: 5,
    lineHeight: 28,
  },
});