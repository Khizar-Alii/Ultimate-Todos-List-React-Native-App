import {  Text, View,Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
const NoTodo = () => {
  return (
    <View style={{ alignItems: "center"}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.primaryLight,
          borderRadius: 200,
          padding: 20,
        }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/927/927711.png",
          }}
          style={{ width: 40, height: 40 }}
        />
      </View>
      <View style={{ alignItems: "center", paddingVertical: 30, gap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: Colors.white }}>
          There is nothing scheduled
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "300", color: Colors.grey }}>
          Try adding new Activities
        </Text>
      </View>
    </View>
  );
};

export default NoTodo;