import React from "react";
import { View, Text, StyleSheet, FlatList, Image,TouchableOpacity } from "react-native";
import withCustomHeader from "../../../components/withCustomHeader/withCustomHeader";
import { Colors } from "../../../constants/Colors";
import { categories } from "../../../constants/categories";
import { router } from "expo-router";

const Category = () => {
  const handlePress = (item) => {
    router.push({
      pathname: "/categoryDetails/categories",
      params: { item: JSON.stringify(item) }, 
    });
  };
  return (
    <View style={{ backgroundColor: Colors.black, flex: 1,
    paddingBottom : 80,padding : 15}}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listContainer} onPress={()=>handlePress(item)}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 30, height: 30,borderWidth:1,borderColor:Colors.grey,padding : 40,borderRadius :200 }}
            />
            <View>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categoryDesc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default withCustomHeader(Category);
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: Colors.light,
    fontWeight: "700",
    padding: 20,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
    marginVertical: 4,
    flexDirection : 'row',
    padding : 20,
    borderRadius : 15,
    gap : 10,
    alignItems : 'center',
  },
  categoryName: {
    fontSize: 14,
    color: Colors.light,
    fontWeight: "400",
    paddingVertical: 2,
  },
  categoryDesc: {
    fontSize: 13,
    color: Colors.grey,
    fontWeight: "300",
  },
});
